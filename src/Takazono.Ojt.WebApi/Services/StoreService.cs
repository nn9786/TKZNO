using Microsoft.EntityFrameworkCore;
using TakazonoOjt.Api.Common;
using TakazonoOjt.Api.Data;
using TakazonoOjt.Api.Dtos.Store;

namespace TakazonoOjt.Api.Services;

public class StoreService(AppDbContext db) : IStoreService
{
    public async Task<PagedResult<StoreDto>> SearchAsync(SearchStoreRequest request, CancellationToken ct)
    {
        var query = db.Stores.AsNoTracking().AsQueryable();

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

        return new PagedResult<StoreDto>
        {
            Items = items,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize,
            TotalCount = totalCount,
        };
    }

    public async Task<StoreDto> GetAsync(long sid, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);
        return ToDto(entity);
    }

    public async Task<StoreDto> CreateAsync(CreateStoreRequest request, CancellationToken ct)
    {
        if (await db.Stores.AnyAsync(x => x.Code == request.Code, ct))
        {
            throw new ConflictAppException($"店舗コード '{request.Code}' は既に使用されています。");
        }

        var maxOrder = await db.Stores.MaxAsync(x => (int?)x.DisplayOrderNumber, ct) ?? 0;
        var now = DateTime.Now;

        var entity = new Entities.Store
        {
            Code = request.Code,
            Name = request.Name,
            PostalCode = request.PostalCode,
            Address = request.Address,
            PhoneNumber = request.PhoneNumber,
            UseFlag = request.UseFlag,
            DisplayOrderNumber = maxOrder + 1,
            CreatedDateTime = now,
            ModifiedDateTime = now,
            CreatedName = "system",
            ModifiedName = "system",
        };

        db.Stores.Add(entity);
        await db.SaveChangesAsync(ct);
        return ToDto(entity);
    }

    public async Task<StoreDto> UpdateAsync(long sid, UpdateStoreRequest request, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);

        if (await db.Stores.AnyAsync(x => x.Code == request.Code && x.Sid != sid, ct))
        {
            throw new ConflictAppException($"店舗コード '{request.Code}' は既に使用されています。");
        }

        db.Entry(entity).Property(x => x.Version).OriginalValue = Convert.FromBase64String(request.Version);

        entity.Code = request.Code;
        entity.Name = request.Name;
        entity.PostalCode = request.PostalCode;
        entity.Address = request.Address;
        entity.PhoneNumber = request.PhoneNumber;
        entity.UseFlag = request.UseFlag;
        entity.ModifiedDateTime = DateTime.Now;
        entity.ModifiedName = "system";

        await SaveWithConcurrencyCheckAsync(ct);
        return ToDto(entity);
    }

    public async Task DeleteAsync(long sid, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);
        db.Stores.Remove(entity);
        await db.SaveChangesAsync(ct);
    }

    public async Task UpdateDisplayOrderAsync(UpdateDisplayOrderRequest request, CancellationToken ct)
    {
        var entities = await db.Stores.Where(x => request.OrderedSids.Contains(x.Sid)).ToListAsync(ct);
        foreach (var entity in entities)
        {
            entity.DisplayOrderNumber = request.OrderedSids.IndexOf(entity.Sid) + 1;
        }
        await db.SaveChangesAsync(ct);
    }

    private async Task<Entities.Store> FindOrThrowAsync(long sid, CancellationToken ct) =>
        await db.Stores.FindAsync([sid], ct) ?? throw new NotFoundAppException($"店舗(Sid={sid})が見つかりません。");

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

    private static StoreDto ToDto(Entities.Store x) => new()
    {
        Sid = x.Sid,
        Code = x.Code,
        Name = x.Name,
        PostalCode = x.PostalCode,
        Address = x.Address,
        PhoneNumber = x.PhoneNumber,
        UseFlag = x.UseFlag,
        DisplayOrderNumber = x.DisplayOrderNumber,
        Version = Convert.ToBase64String(x.Version),
    };
}
