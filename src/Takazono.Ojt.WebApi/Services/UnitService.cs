using Microsoft.EntityFrameworkCore;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Data;
using Takazono.Ojt.WebApi.Dtos.Unit;

namespace Takazono.Ojt.WebApi.Services;

public class UnitService(AppDbContext db) : IUnitService
{
    public async Task<PagedResult<UnitDto>> SearchAsync(SearchUnitRequest request, CancellationToken ct)
    {
        var query = db.Units.AsNoTracking().AsQueryable();

        if (!request.IncludeInactive)
        {
            query = query.Where(x => x.UseFlag);
        }

        if (!string.IsNullOrWhiteSpace(request.Keyword))
        {
            query = query.Where(x => x.Code.Contains(request.Keyword) || x.Name.Contains(request.Keyword));
        }

        var totalCount = await query.CountAsync(ct);

        var items = await query
            .OrderBy(x => x.DisplayOrderNumber)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(x => ToDto(x))
            .ToListAsync(ct);

        return new PagedResult<UnitDto>
        {
            Items = items,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize,
            TotalCount = totalCount,
        };
    }

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
            CreatedName = "system",
            ModifiedName = "system",
        };

        db.Units.Add(entity);
        await db.SaveChangesAsync(ct);
        return ToDto(entity);
    }

    public async Task<UnitDto> UpdateAsync(long sid, UpdateUnitRequest request, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);

        if (await db.Units.AnyAsync(x => x.Code == request.Code && x.Sid != sid, ct))
        {
            throw new ConflictAppException($"単位コード '{request.Code}' は既に使用されています。");
        }

        db.Entry(entity).Property(x => x.Version).OriginalValue = Convert.FromBase64String(request.Version);

        entity.Code = request.Code;
        entity.Name = request.Name;
        entity.UseFlag = request.UseFlag;
        entity.ModifiedDateTime = DateTime.Now;
        entity.ModifiedName = "system";

        await SaveWithConcurrencyCheckAsync(ct);
        return ToDto(entity);
    }

    public async Task DeleteAsync(long sid, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);
        db.Units.Remove(entity);
        await db.SaveChangesAsync(ct);
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
            throw new ConflictAppException("他のユーザーによって更新されています。画面を再読み込みしてください。");
        }
    }

    private static UnitDto ToDto(Entities.Unit x) => new()
    {
        Sid = x.Sid,
        Code = x.Code,
        Name = x.Name,
        UseFlag = x.UseFlag,
        DisplayOrderNumber = x.DisplayOrderNumber,
        Version = Convert.ToBase64String(x.Version),
    };
}
