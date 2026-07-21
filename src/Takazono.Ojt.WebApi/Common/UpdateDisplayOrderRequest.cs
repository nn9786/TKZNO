namespace Takazono.Ojt.WebApi.Common;

/// <summary>Shared shape for the "UpdateDisplayOrder" action every reorderable master exposes.</summary>
public class UpdateDisplayOrderRequest
{
    /// <summary>Sids in the new display order (first item gets DisplayOrderNumber = 1, etc.).</summary>
    public List<long> OrderedSids { get; init; } = [];
}
