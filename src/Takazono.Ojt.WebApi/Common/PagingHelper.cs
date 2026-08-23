using Microsoft.EntityFrameworkCore;

namespace Takazono.Ojt.WebApi.Common;

/// <summary>
/// Shared tail of every master's paged Search: resolves the requested sort key/direction against an
/// allow-list, then normalizes paging and builds the <see cref="PagedResult{TDto}"/> once the caller has
/// applied its own entity-specific ORDER BY. The field-to-column mapping itself stays in each service
/// (rather than a fully generic dynamic sort via reflection) because EF Core cannot reliably translate an
/// ORDER BY on a value-type property boxed to <see cref="object"/>.
/// </summary>
public static class PagingHelper
{
    public static bool IsDescending(string? sortDirection) =>
        string.Equals(sortDirection, SortDirections.Descending, StringComparison.OrdinalIgnoreCase);

    public static string ResolveSortKey(string? requestedSortKey, IReadOnlySet<string> allowedSortKeys, string defaultSortKey) =>
        requestedSortKey is not null && allowedSortKeys.Contains(requestedSortKey) ? requestedSortKey : defaultSortKey;

    /// <summary>Adds the Sid tie-breaker, pages, projects to <typeparamref name="TDto"/> and builds the <see cref="PagedResult{TDto}"/>.</summary>
    public static async Task<PagedResult<TDto>> BuildAsync<TEntity, TDto>(
        IOrderedQueryable<TEntity> sortedQuery,
        int totalCount,
        int pageNumber,
        int pageSize,
        string sortKey,
        bool descending,
        Func<TEntity, TDto> toDto,
        CancellationToken ct)
        where TEntity : BaseEntity
    {
        pageNumber = Math.Max(1, pageNumber);
        pageSize = Math.Max(1, pageSize);

        // 各キーの後ろにSid昇順のタイブレーカーを付け、同値行が並ぶ場合でもページ送りで重複/欠落が起きないようにする
        // （SQL Serverは単一列ソートで同値行の順序を保証しないため）。
        var items = await sortedQuery
            .ThenBy(x => x.Sid)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => toDto(x))
            .ToListAsync(ct);

        return new PagedResult<TDto>
        {
            Items = items,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount,
            SortKey = sortKey,
            SortDirection = descending ? SortDirections.Descending : SortDirections.Ascending,
        };
    }
}
