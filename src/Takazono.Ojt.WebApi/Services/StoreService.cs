using System.Globalization;
using System.Text;
using CsvHelper;
using Microsoft.EntityFrameworkCore;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Data;
using Takazono.Ojt.WebApi.Dtos.Store;

namespace Takazono.Ojt.WebApi.Services;

public class StoreService(AppDbContext db, ICurrentUserService currentUserService) : IStoreService
{
    private static readonly HashSet<string> AllowedSortKeys = new(StringComparer.OrdinalIgnoreCase)
    {
        "code", "name", "useFlag", "displayOrderNumber",
    };

    public async Task<PagedResult<StoreDto>> SearchAsync(SearchStoreRequest request, CancellationToken ct)
    {
        var query = db.Stores.AsNoTracking().AsQueryable();

        if (!request.IncludeInactive)
        {
            query = query.Where(x => x.UseFlag);
        }

        // フリーワード（名称、複数語はAND・部分一致）とコード（完全一致）を別条件として適用する（Takazono.Oliveの検索仕様に合わせている）。
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

        // 各キーの後ろにSid昇順のタイブレーカーを付け、同値行が並ぶ場合でもページ送りで重複/欠落が起きないようにする
        // （SQL Serverは単一列ソートで同値行の順序を保証しないため）。
        IOrderedQueryable<Entities.Store> sortedQuery = sortKey.ToLowerInvariant() switch
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

        return new PagedResult<StoreDto>
        {
            Items = items,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount,
            SortKey = sortKey,
            SortDirection = descending ? SortDirections.Descending : SortDirections.Ascending,
        };
    }

    public async Task<IReadOnlyList<StoreDto>> GetAllAsync(CancellationToken ct) =>
        await db.Stores
            .AsNoTracking()
            .Where(x => x.UseFlag)
            .OrderBy(x => x.DisplayOrderNumber)
            .Select(x => ToDto(x))
            .ToListAsync(ct);

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
            CreatedSid = currentUserService.Sid,
            CreatedName = currentUserService.UserName,
            ModifiedSid = currentUserService.Sid,
            ModifiedName = currentUserService.UserName,
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

        ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), request.Version);

        entity.Code = request.Code;
        entity.Name = request.Name;
        entity.PostalCode = request.PostalCode;
        entity.Address = request.Address;
        entity.PhoneNumber = request.PhoneNumber;
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
        db.Stores.Remove(entity);
        await SaveWithConcurrencyCheckAsync(ct);
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

    /// <summary>半角/全角スペースで区切って複数キーワードに分解する（Takazono.Oliveの`filterFreeWord`相当。分割はフロントではなくここで行う）。</summary>
    private static string[] SplitKeywords(string? keyword) =>
        string.IsNullOrWhiteSpace(keyword)
            ? []
            : keyword.Split([' ', '　'], StringSplitOptions.RemoveEmptyEntries);

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
            throw new ConcurrencyConflictAppException("他のユーザーによって更新されています。画面を再読み込みしてください。");
        }
    }

    public async Task<byte[]> DownloadCsvAsync(string? language, CancellationToken ct)
    {
        var rows = await db.Stores
            .AsNoTracking()
            .OrderBy(x => x.DisplayOrderNumber)
            .ToListAsync(ct);

        using var memoryStream = new MemoryStream();

        // UIの言語切替と揃えるため、CSVの見出し・改行コードもリクエストされた言語に合わせて出し分ける。
        // 日本語はExcelでの文字化けを避けるためShift-JIS、英語はUTF-8（BOM付き）を用いる。
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

    private static StoreCsvRow ToCsvRow(Entities.Store x) => new()
    {
        Code = x.Code,
        Name = x.Name,
        PostalCode = x.PostalCode,
        Address = x.Address,
        PhoneNumber = x.PhoneNumber,
        UseFlag = x.UseFlag ? "○" : string.Empty,
        DisplayOrderNumber = x.DisplayOrderNumber,
    };

    private static StoreCsvRowEn ToCsvRowEn(Entities.Store x) => new()
    {
        Code = x.Code,
        Name = x.Name,
        PostalCode = x.PostalCode,
        Address = x.Address,
        PhoneNumber = x.PhoneNumber,
        UseFlag = x.UseFlag ? "Y" : string.Empty,
        DisplayOrderNumber = x.DisplayOrderNumber,
    };

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
        CreatedDateTime = x.CreatedDateTime,
        CreatedName = x.CreatedName,
        ModifiedDateTime = x.ModifiedDateTime,
        ModifiedName = x.ModifiedName,
    };
}
