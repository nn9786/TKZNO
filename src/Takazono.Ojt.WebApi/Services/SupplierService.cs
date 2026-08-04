using System.Globalization;
using System.Text;
using CsvHelper;
using Microsoft.EntityFrameworkCore;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Data;
using Takazono.Ojt.WebApi.Dtos.Supplier;

namespace Takazono.Ojt.WebApi.Services;

public class SupplierService(AppDbContext db, ICurrentUserService currentUserService) : ISupplierService
{
    private static readonly HashSet<string> AllowedSortKeys = new(StringComparer.OrdinalIgnoreCase)
    {
        "code", "name", "useFlag", "displayOrderNumber",
    };

    public async Task<PagedResult<SupplierDto>> SearchAsync(SearchSupplierRequest request, CancellationToken ct)
    {
        var query = db.Suppliers.AsNoTracking().AsQueryable();

        if (!request.IncludeInactive)
        {
            query = query.Where(x => x.UseFlag);
        }

        // フリーワード(名称、複数語はAND・部分一致)とコード(完全一致)を別条件として適用する(Storeと同じ検索仕様)。
        foreach (var word in SplitKeywords(request.Keyword))
        {
            query = query.Where(x => x.Name.Contains(word));
        }

        if (!string.IsNullOrWhiteSpace(request.Code))
        {
            query = query.Where(x => x.Code == request.Code);
        }

        var totalCount = await query.CountAsync(ct);

        var sortKey = AllowedSortKeys.Contains(request.SortKey ?? string.Empty) ? request.SortKey! : "displayOrderNumber";
        var descending = string.Equals(request.SortDirection, SortDirections.Descending, StringComparison.OrdinalIgnoreCase);

        IOrderedQueryable<Entities.Supplier> sortedQuery = sortKey.ToLowerInvariant() switch
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

        return new PagedResult<SupplierDto>
        {
            Items = items,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount,
            SortKey = sortKey,
            SortDirection = descending ? SortDirections.Descending : SortDirections.Ascending,
        };
    }

    public async Task<SupplierDto> GetAsync(long sid, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);
        return ToDto(entity);
    }

    public async Task<SupplierDto> CreateAsync(CreateSupplierRequest request, CancellationToken ct)
    {
        if (await db.Suppliers.AnyAsync(x => x.Code == request.Code, ct))
        {
            throw new ConflictAppException($"取引先コード '{request.Code}' は既に使用されています。");
        }

        var maxOrder = await db.Suppliers.MaxAsync(x => (int?)x.DisplayOrderNumber, ct) ?? 0;
        var now = DateTime.Now;

        var entity = new Entities.Supplier
        {
            Code = request.Code,
            Name = request.Name,
            SupplierTypeKubun = ParseSupplierTypeKubun(request.SupplierTypeKubun),
            CorporateNumber = request.CorporateNumber,
            PostalCode = request.PostalCode,
            Address = request.Address,
            PhoneNumber = request.PhoneNumber,
            CreditLimit = request.CreditLimit,
            TransactionStartDate = request.TransactionStartDate,
            UseFlag = request.UseFlag,
            DisplayOrderNumber = maxOrder + 1,
            CreatedDateTime = now,
            ModifiedDateTime = now,
            CreatedSid = currentUserService.Sid,
            CreatedName = currentUserService.UserName,
            ModifiedSid = currentUserService.Sid,
            ModifiedName = currentUserService.UserName,
        };

        db.Suppliers.Add(entity);
        await db.SaveChangesAsync(ct);
        return ToDto(entity);
    }

    public async Task<SupplierDto> UpdateAsync(long sid, UpdateSupplierRequest request, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);

        if (await db.Suppliers.AnyAsync(x => x.Code == request.Code && x.Sid != sid, ct))
        {
            throw new ConflictAppException($"取引先コード '{request.Code}' は既に使用されています。");
        }

        var requestedKubun = ParseSupplierTypeKubun(request.SupplierTypeKubun);

        // 与信限度額が既に設定されている取引先は、区分を「個人」に変更できない(状態依存のビジネスルール、Unitの削除保護と同系統)。
        if (entity.CreditLimit.HasValue && requestedKubun == Entities.SupplierTypeKubun.Individual)
        {
            throw new BusinessRuleAppException($"取引先 '{entity.Name}' は与信限度額が設定されているため、区分を「個人」に変更できません。");
        }

        ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), request.Version);

        entity.Code = request.Code;
        entity.Name = request.Name;
        entity.SupplierTypeKubun = requestedKubun;
        entity.CorporateNumber = request.CorporateNumber;
        entity.PostalCode = request.PostalCode;
        entity.Address = request.Address;
        entity.PhoneNumber = request.PhoneNumber;
        entity.CreditLimit = request.CreditLimit;
        entity.TransactionStartDate = request.TransactionStartDate;
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
        db.Suppliers.Remove(entity);
        await SaveWithConcurrencyCheckAsync(ct);
    }

    public async Task UpdateDisplayOrderAsync(UpdateDisplayOrderRequest request, CancellationToken ct)
    {
        var entities = await db.Suppliers.Where(x => request.OrderedSids.Contains(x.Sid)).ToListAsync(ct);
        foreach (var entity in entities)
        {
            entity.DisplayOrderNumber = request.OrderedSids.IndexOf(entity.Sid) + 1;
        }
        await db.SaveChangesAsync(ct);
    }

    /// <summary>半角/全角スペースで区切って複数キーワードに分解する(Storeと同じ)。</summary>
    private static string[] SplitKeywords(string? keyword) =>
        string.IsNullOrWhiteSpace(keyword)
            ? []
            : keyword.Split([' ', '　'], StringSplitOptions.RemoveEmptyEntries);

    private static Entities.SupplierTypeKubun ParseSupplierTypeKubun(string value) =>
        Enum.TryParse<Entities.SupplierTypeKubun>(value, out var parsed) ? parsed : throw new BusinessRuleAppException($"取引先区分 '{value}' は不正です。");

    private async Task<Entities.Supplier> FindOrThrowAsync(long sid, CancellationToken ct) =>
        await db.Suppliers.FindAsync([sid], ct) ?? throw new NotFoundAppException($"取引先(Sid={sid})が見つかりません。");

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

    public async Task<byte[]> DownloadCsvAsync(string? language, CancellationToken ct)
    {
        var rows = await db.Suppliers
            .AsNoTracking()
            .OrderBy(x => x.DisplayOrderNumber)
            .ToListAsync(ct);

        using var memoryStream = new MemoryStream();

        if (string.Equals(language, "en", StringComparison.OrdinalIgnoreCase))
        {
            var enRows = rows.Select(ToCsvRowEn);
            await using var writer = new StreamWriter(memoryStream, new UTF8Encoding(true), leaveOpen: true);
            await using var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);
            await csv.WriteRecordsAsync(enRows, ct);
        }
        else
        {
            var jaRows = rows.Select(ToCsvRow);
            await using var writer = new StreamWriter(memoryStream, Encoding.GetEncoding("shift_jis"), leaveOpen: true);
            await using var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);
            await csv.WriteRecordsAsync(jaRows, ct);
        }

        return memoryStream.ToArray();
    }

    private static SupplierCsvRow ToCsvRow(Entities.Supplier x) => new()
    {
        Code = x.Code,
        Name = x.Name,
        SupplierTypeKubun = x.SupplierTypeKubun == Entities.SupplierTypeKubun.Corporate ? "法人" : "個人",
        CorporateNumber = x.CorporateNumber,
        PostalCode = x.PostalCode,
        Address = x.Address,
        PhoneNumber = x.PhoneNumber,
        CreditLimit = x.CreditLimit,
        TransactionStartDate = x.TransactionStartDate.ToString("yyyy/MM/dd"),
        UseFlag = x.UseFlag ? "○" : string.Empty,
        DisplayOrderNumber = x.DisplayOrderNumber,
    };

    private static SupplierCsvRowEn ToCsvRowEn(Entities.Supplier x) => new()
    {
        Code = x.Code,
        Name = x.Name,
        SupplierTypeKubun = x.SupplierTypeKubun.ToString(),
        CorporateNumber = x.CorporateNumber,
        PostalCode = x.PostalCode,
        Address = x.Address,
        PhoneNumber = x.PhoneNumber,
        CreditLimit = x.CreditLimit,
        TransactionStartDate = x.TransactionStartDate.ToString("yyyy-MM-dd"),
        UseFlag = x.UseFlag ? "Y" : string.Empty,
        DisplayOrderNumber = x.DisplayOrderNumber,
    };

    private static SupplierDto ToDto(Entities.Supplier x) => new()
    {
        Sid = x.Sid,
        Code = x.Code,
        Name = x.Name,
        SupplierTypeKubun = x.SupplierTypeKubun.ToString(),
        CorporateNumber = x.CorporateNumber,
        PostalCode = x.PostalCode,
        Address = x.Address,
        PhoneNumber = x.PhoneNumber,
        CreditLimit = x.CreditLimit,
        TransactionStartDate = x.TransactionStartDate,
        UseFlag = x.UseFlag,
        DisplayOrderNumber = x.DisplayOrderNumber,
        Version = Convert.ToBase64String(x.Version),
        CreatedDateTime = x.CreatedDateTime,
        CreatedName = x.CreatedName,
        ModifiedDateTime = x.ModifiedDateTime,
        ModifiedName = x.ModifiedName,
    };
}
