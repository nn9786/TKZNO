namespace Takazono.Ojt.WebApi.Common;

/// <summary>Shared shape for the "UpdateDisplayOrder" action every reorderable master exposes.</summary>
public class UpdateDisplayOrderRequest
{
    /// <summary>
    /// Rows in their new order (first item gets DisplayOrderNumber = 1, etc.). Each row carries the
    /// version token the client last read, so a concurrent edit/delete/reorder of that row is caught by
    /// the same optimistic-concurrency check every other mutation uses (Takazono.Oliveの`WardDisplayOrderDrawer`等と同様の仕様)。
    /// </summary>
    public List<UpdateDisplayOrderItem> Items { get; init; } = [];
}

public class UpdateDisplayOrderItem
{
    public long Sid { get; init; }

    public string Version { get; init; } = string.Empty;
}
