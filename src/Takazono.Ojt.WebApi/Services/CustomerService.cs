using Microsoft.EntityFrameworkCore;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Data;
using Takazono.Ojt.WebApi.Dtos.Customer;

namespace Takazono.Ojt.WebApi.Services;

public class CustomerService(AppDbContext db, ICurrentUserService currentUserService) : ICustomerService
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

        var sortKey = AllowedSortKeys.Contains(request.SortKey ?? string.Empty) ? request.SortKey! : "displayOrderNumber";
        var descending = string.Equals(request.SortDirection, SortDirections.Descending, StringComparison.OrdinalIgnoreCase);

        IOrderedQueryable<Entities.Customer> sortedQuery = sortKey.ToLowerInvariant() switch
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

        return new PagedResult<CustomerDto>
        {
            Items = items,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount,
            SortKey = sortKey,
            SortDirection = descending ? SortDirections.Descending : SortDirections.Ascending,
        };
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
        var now = DateTime.Now;

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
            CreatedDateTime = now,
            ModifiedDateTime = now,
            CreatedSid = currentUserService.Sid,
            CreatedName = currentUserService.UserName,
            ModifiedSid = currentUserService.Sid,
            ModifiedName = currentUserService.UserName,
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
        entity.ModifiedDateTime = DateTime.Now;
        entity.ModifiedSid = currentUserService.Sid;
        entity.ModifiedName = currentUserService.UserName;

        await SaveWithConcurrencyCheckAsync(ct);
        return ToDto(entity);
    }

    public async Task DeleteAsync(long sid, string version, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);
        ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), version);
        db.Customers.Remove(entity);
        await SaveWithConcurrencyCheckAsync(ct);
    }

    public async Task UpdateDisplayOrderAsync(UpdateDisplayOrderRequest request, CancellationToken ct)
    {
        var entities = await db.Customers.Where(x => request.OrderedSids.Contains(x.Sid)).ToListAsync(ct);
        foreach (var entity in entities)
        {
            entity.DisplayOrderNumber = request.OrderedSids.IndexOf(entity.Sid) + 1;
        }
        await db.SaveChangesAsync(ct);
    }

    private static Entities.CustomerRankKubun ParseCustomerRankKubun(string value) =>
        Enum.TryParse<Entities.CustomerRankKubun>(value, out var parsed) ? parsed : throw new BusinessRuleAppException($"得意先区分 '{value}' は不正です。");

    private async Task<Entities.Customer> FindOrThrowAsync(long sid, CancellationToken ct) =>
        await db.Customers.FindAsync([sid], ct) ?? throw new NotFoundAppException($"得意先(Sid={sid})が見つかりません。");

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
