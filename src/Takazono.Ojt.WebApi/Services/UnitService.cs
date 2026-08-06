using Microsoft.EntityFrameworkCore;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Data;
using Takazono.Ojt.WebApi.Dtos.Unit;

namespace Takazono.Ojt.WebApi.Services;

public class UnitService(AppDbContext db, ICurrentUserService currentUserService) : IUnitService
{
    private static readonly HashSet<string> AllowedSortKeys = new(StringComparer.OrdinalIgnoreCase)
    {
        "code", "name", "useFlag", "displayOrderNumber",
    };

    public async Task<PagedResult<UnitDto>> SearchAsync(SearchUnitRequest request, CancellationToken ct)
    {
        var query = db.Units.AsNoTracking().AsQueryable();

        if (!request.IncludeInactive)
        {
            query = query.Where(x => x.UseFlag);
        }

        var totalCount = await query.CountAsync(ct);

        var sortKey = AllowedSortKeys.Contains(request.SortKey ?? string.Empty) ? request.SortKey! : "displayOrderNumber";
        var descending = string.Equals(request.SortDirection, SortDirections.Descending, StringComparison.OrdinalIgnoreCase);

        // 各キーの後ろにSid昇順のタイブレーカーを付け、同値行が並ぶ場合でもページ送りで重複/欠落が起きないようにする
        // （SQL Serverは単一列ソートで同値行の順序を保証しないため）。
        IOrderedQueryable<Entities.Unit> sortedQuery = sortKey.ToLowerInvariant() switch
        {
            "code" => descending ? query.OrderByDescending(x => x.Code) : query.OrderBy(x => x.Code),
            "name" => descending ? query.OrderByDescending(x => x.Name) : query.OrderBy(x => x.Name),
            "useflag" => descending ? query.OrderByDescending(x => x.UseFlag) : query.OrderBy(x => x.UseFlag),
            _ => descending ? query.OrderByDescending(x => x.DisplayOrderNumber) : query.OrderBy(x => x.DisplayOrderNumber),
        };
        sortedQuery = sortedQuery.ThenBy(x => x.Sid);

        var pageNumber = Math.Max(1, request.PageNumber);
        var pageSize = Math.Max(1, request.PageSize);

        var items = await sortedQuery
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => ToDto(x))
            .ToListAsync(ct);

        return new PagedResult<UnitDto>
        {
            Items = items,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount,
            SortKey = sortKey,
            SortDirection = descending ? SortDirections.Descending : SortDirections.Ascending,
        };
    }

    public async Task<IReadOnlyList<UnitDto>> GetAllAsync(CancellationToken ct) =>
        await db.Units
            .AsNoTracking()
            .Where(x => x.UseFlag)
            .OrderBy(x => x.DisplayOrderNumber)
            .Select(x => ToDto(x))
            .ToListAsync(ct);

    public async Task<UnitDto> GetAsync(long sid, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);
        return ToDto(entity);
    }

    public async Task<UnitDto> CreateAsync(CreateUnitRequest request, CancellationToken ct)
    {
        if (await db.Units.AnyAsync(x => x.Code == request.Code, ct))
        {
            throw new ConflictAppException($"単位コード '{request.Code}' は既に使用されています。");
        }

        var maxOrder = await db.Units.MaxAsync(x => (int?)x.DisplayOrderNumber, ct) ?? 0;
        var now = DateTime.Now;

        var entity = new Entities.Unit
        {
            Code = request.Code,
            Name = request.Name,
            UseFlag = request.UseFlag,
            DisplayOrderNumber = maxOrder + 1,
            CreatedDateTime = now,
            ModifiedDateTime = now,
            CreatedSid = currentUserService.Sid,
            CreatedName = currentUserService.UserName,
            ModifiedSid = currentUserService.Sid,
            ModifiedName = currentUserService.UserName,
        };

        db.Units.Add(entity);
        await db.SaveChangesAsync(ct);
        return ToDto(entity);
    }

    public async Task<UnitDto> UpdateAsync(long sid, UpdateUnitRequest request, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);

        if (entity.UnDeleteFlag && !request.UseFlag)
        {
            throw new BusinessRuleAppException($"単位 '{entity.Name}' は削除保護されているため、使用中止にできません。");
        }

        if (await db.Units.AnyAsync(x => x.Code == request.Code && x.Sid != sid, ct))
        {
            throw new ConflictAppException($"単位コード '{request.Code}' は既に使用されています。");
        }

        ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), request.Version);

        entity.Code = request.Code;
        entity.Name = request.Name;
        entity.UseFlag = request.UseFlag;
        entity.ModifiedDateTime = DateTime.Now;
        entity.ModifiedSid = currentUserService.Sid;
        entity.ModifiedName = currentUserService.UserName;

        await SaveWithConcurrencyCheckAsync(ct);
        return ToDto(entity);
    }

    public async Task DeleteAsync(long sid, string version, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);

        if (entity.UnDeleteFlag)
        {
            throw new BusinessRuleAppException($"単位 '{entity.Name}' は削除保護されているため削除できません。");
        }

        ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), version);
        db.Units.Remove(entity);
        await SaveWithConcurrencyCheckAsync(ct);
    }

    public async Task UpdateDisplayOrderAsync(UpdateDisplayOrderRequest request, CancellationToken ct)
    {
        var entities = await db.Units.Where(x => request.OrderedSids.Contains(x.Sid)).ToListAsync(ct);
        foreach (var entity in entities)
        {
            entity.DisplayOrderNumber = request.OrderedSids.IndexOf(entity.Sid) + 1;
        }
        await db.SaveChangesAsync(ct);
    }

    private async Task<Entities.Unit> FindOrThrowAsync(long sid, CancellationToken ct) =>
        await db.Units.FindAsync([sid], ct) ?? throw new NotFoundAppException($"単位(Sid={sid})が見つかりません。");

    private async Task SaveWithConcurrencyCheckAsync(CancellationToken ct)
    {
        try
        {
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateConcurrencyException)
        {
            throw new ConcurrencyConflictAppException("他のユーザーによって更新されています。画面を再読み込みしてください。");
        }
    }

    private static UnitDto ToDto(Entities.Unit x) => new()
    {
        Sid = x.Sid,
        Code = x.Code,
        Name = x.Name,
        UseFlag = x.UseFlag,
        DisplayOrderNumber = x.DisplayOrderNumber,
        UnDeleteFlag = x.UnDeleteFlag,
        Version = Convert.ToBase64String(x.Version),
        CreatedDateTime = x.CreatedDateTime,
        CreatedName = x.CreatedName,
        ModifiedDateTime = x.ModifiedDateTime,
        ModifiedName = x.ModifiedName,
    };
}
