using Microsoft.EntityFrameworkCore;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Data;
using Takazono.Ojt.WebApi.Dtos.Unit;

namespace Takazono.Ojt.WebApi.Services;

public class UnitService(AppDbContext db) : IUnitService
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

        var sortKey = PagingHelper.ResolveSortKey(request.SortKey, AllowedSortKeys, "displayOrderNumber");
        var descending = PagingHelper.IsDescending(request.SortDirection);

        IOrderedQueryable<Entities.Unit> sortedQuery = sortKey.ToLowerInvariant() switch
        {
            "code" => descending ? query.OrderByDescending(x => x.Code) : query.OrderBy(x => x.Code),
            "name" => descending ? query.OrderByDescending(x => x.Name) : query.OrderBy(x => x.Name),
            "useflag" => descending ? query.OrderByDescending(x => x.UseFlag) : query.OrderBy(x => x.UseFlag),
            _ => descending ? query.OrderByDescending(x => x.DisplayOrderNumber) : query.OrderBy(x => x.DisplayOrderNumber),
        };

        return await PagingHelper.BuildAsync(sortedQuery, totalCount, request.PageNumber, request.PageSize, sortKey, descending, ToDto, ct);
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

        var entity = new Entities.Unit
        {
            Code = request.Code,
            Name = request.Name,
            UseFlag = request.UseFlag,
            DisplayOrderNumber = maxOrder + 1,
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

        await db.SaveChangesAsync(ct);
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

        var deletedOrder = entity.DisplayOrderNumber;
        db.Units.Remove(entity);

        // 削除後に表示順が欠番のまま残らないよう、後続の表示順を1つずつ繰り上げる。
        var subsequentEntities = await db.Units.Where(x => x.DisplayOrderNumber > deletedOrder).ToListAsync(ct);
        foreach (var subsequent in subsequentEntities)
        {
            subsequent.DisplayOrderNumber -= 1;
        }

        await db.SaveChangesAsync(ct);
    }

    public async Task UpdateDisplayOrderAsync(UpdateDisplayOrderRequest request, CancellationToken ct)
    {
        var totalCount = await db.Units.CountAsync(ct);
        if (request.Items.Count != totalCount)
        {
            throw new BusinessRuleAppException("表示順の更新には全件を送信してください。");
        }

        var sids = request.Items.Select(x => x.Sid).ToList();
        var entities = await db.Units.Where(x => sids.Contains(x.Sid)).ToDictionaryAsync(x => x.Sid, ct);

        for (var i = 0; i < request.Items.Count; i++)
        {
            var item = request.Items[i];
            if (!entities.TryGetValue(item.Sid, out var entity))
            {
                throw new NotFoundAppException($"単位(Sid={item.Sid})が見つかりません。");
            }

            ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), item.Version);
            entity.DisplayOrderNumber = i + 1;
        }

        await db.SaveChangesAsync(ct);
    }

    private async Task<Entities.Unit> FindOrThrowAsync(long sid, CancellationToken ct) =>
        await db.Units.FindAsync([sid], ct) ?? throw new NotFoundAppException($"単位(Sid={sid})が見つかりません。");

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
