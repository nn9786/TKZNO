using Microsoft.EntityFrameworkCore;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Data;
using Takazono.Ojt.WebApi.Dtos.Customer;

namespace Takazono.Ojt.WebApi.Services;

public class CustomerService(AppDbContext db) : ICustomerService
{
    private static readonly HashSet<string> AllowedSortKeys = new(StringComparer.OrdinalIgnoreCase)
    {
        "code", "name", "useFlag", "displayOrderNumber",
    };

    public async Task<PagedResult<CustomerDto>> SearchAsync(SearchCustomerRequest request, CancellationToken ct)
    {
        var query = db.Customers.AsNoTracking().AsQueryable();

        if (!request.IncludeInactive)
        {
            query = query.Where(x => x.UseFlag);
        }

        var totalCount = await query.CountAsync(ct);

        var sortKey = PagingHelper.ResolveSortKey(request.SortKey, AllowedSortKeys, "displayOrderNumber");
        var descending = PagingHelper.IsDescending(request.SortDirection);

        IOrderedQueryable<Entities.Customer> sortedQuery = sortKey.ToLowerInvariant() switch
        {
            "code" => descending ? query.OrderByDescending(x => x.Code) : query.OrderBy(x => x.Code),
            "name" => descending ? query.OrderByDescending(x => x.Name) : query.OrderBy(x => x.Name),
            "useflag" => descending ? query.OrderByDescending(x => x.UseFlag) : query.OrderBy(x => x.UseFlag),
            _ => descending ? query.OrderByDescending(x => x.DisplayOrderNumber) : query.OrderBy(x => x.DisplayOrderNumber),
        };

        return await PagingHelper.BuildAsync(sortedQuery, totalCount, request.PageNumber, request.PageSize, sortKey, descending, ToDto, ct);
    }

    public async Task<CustomerDto> GetAsync(long sid, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);
        return ToDto(entity);
    }

    public async Task<CustomerDto> CreateAsync(CreateCustomerRequest request, CancellationToken ct)
    {
        if (await db.Customers.AnyAsync(x => x.Code == request.Code, ct))
        {
            throw new ConflictAppException($"得意先コード '{request.Code}' は既に使用されています。");
        }

        var maxOrder = await db.Customers.MaxAsync(x => (int?)x.DisplayOrderNumber, ct) ?? 0;

        var entity = new Entities.Customer
        {
            Code = request.Code,
            Name = request.Name,
            CustomerRankKubun = ParseCustomerRankKubun(request.CustomerRankKubun),
            PreferentialDiscountRate = request.PreferentialDiscountRate,
            PostalCode = request.PostalCode,
            Address = request.Address,
            PhoneNumber = request.PhoneNumber,
            ContractStartDate = request.ContractStartDate,
            ContractEndDate = request.ContractEndDate,
            UseFlag = request.UseFlag,
            DisplayOrderNumber = maxOrder + 1,
        };

        db.Customers.Add(entity);
        await db.SaveChangesAsync(ct);
        return ToDto(entity);
    }

    public async Task<CustomerDto> UpdateAsync(long sid, UpdateCustomerRequest request, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);

        if (await db.Customers.AnyAsync(x => x.Code == request.Code && x.Sid != sid, ct))
        {
            throw new ConflictAppException($"得意先コード '{request.Code}' は既に使用されています。");
        }

        ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), request.Version);

        entity.Code = request.Code;
        entity.Name = request.Name;
        entity.CustomerRankKubun = ParseCustomerRankKubun(request.CustomerRankKubun);
        entity.PreferentialDiscountRate = request.PreferentialDiscountRate;
        entity.PostalCode = request.PostalCode;
        entity.Address = request.Address;
        entity.PhoneNumber = request.PhoneNumber;
        entity.ContractStartDate = request.ContractStartDate;
        entity.ContractEndDate = request.ContractEndDate;
        entity.UseFlag = request.UseFlag;

        await db.SaveChangesAsync(ct);
        return ToDto(entity);
    }

    public async Task DeleteAsync(long sid, string version, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);
        ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), version);

        var deletedOrder = entity.DisplayOrderNumber;
        db.Customers.Remove(entity);

        // 削除後に表示順が欠番のまま残らないよう、後続の表示順を1つずつ繰り上げる。
        var subsequentEntities = await db.Customers.Where(x => x.DisplayOrderNumber > deletedOrder).ToListAsync(ct);
        foreach (var subsequent in subsequentEntities)
        {
            subsequent.DisplayOrderNumber -= 1;
        }

        await db.SaveChangesAsync(ct);
    }

    public async Task UpdateDisplayOrderAsync(UpdateDisplayOrderRequest request, CancellationToken ct)
    {
        var totalCount = await db.Customers.CountAsync(ct);
        if (request.Items.Count != totalCount)
        {
            throw new BusinessRuleAppException("表示順の更新には全件を送信してください。");
        }

        var sids = request.Items.Select(x => x.Sid).ToList();
        var entities = await db.Customers.Where(x => sids.Contains(x.Sid)).ToDictionaryAsync(x => x.Sid, ct);

        for (var i = 0; i < request.Items.Count; i++)
        {
            var item = request.Items[i];
            if (!entities.TryGetValue(item.Sid, out var entity))
            {
                throw new NotFoundAppException($"得意先(Sid={item.Sid})が見つかりません。");
            }

            ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), item.Version);
            entity.DisplayOrderNumber = i + 1;
        }

        await db.SaveChangesAsync(ct);
    }

    private static Entities.CustomerRankKubun ParseCustomerRankKubun(string value) =>
        Enum.TryParse<Entities.CustomerRankKubun>(value, out var parsed) ? parsed : throw new BusinessRuleAppException($"得意先区分 '{value}' は不正です。");

    private async Task<Entities.Customer> FindOrThrowAsync(long sid, CancellationToken ct) =>
        await db.Customers.FindAsync([sid], ct) ?? throw new NotFoundAppException($"得意先(Sid={sid})が見つかりません。");

    private static CustomerDto ToDto(Entities.Customer x) => new()
    {
        Sid = x.Sid,
        Code = x.Code,
        Name = x.Name,
        CustomerRankKubun = x.CustomerRankKubun.ToString(),
        PreferentialDiscountRate = x.PreferentialDiscountRate,
        PostalCode = x.PostalCode,
        Address = x.Address,
        PhoneNumber = x.PhoneNumber,
        ContractStartDate = x.ContractStartDate,
        ContractEndDate = x.ContractEndDate,
        UseFlag = x.UseFlag,
        DisplayOrderNumber = x.DisplayOrderNumber,
        Version = Convert.ToBase64String(x.Version),
        CreatedDateTime = x.CreatedDateTime,
        CreatedName = x.CreatedName,
        ModifiedDateTime = x.ModifiedDateTime,
        ModifiedName = x.ModifiedName,
    };
}
