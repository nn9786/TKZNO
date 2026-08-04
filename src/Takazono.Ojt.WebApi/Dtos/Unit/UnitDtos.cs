using System.ComponentModel.DataAnnotations;
using Takazono.Ojt.WebApi.Common;

namespace Takazono.Ojt.WebApi.Dtos.Unit;

public class UnitDto
{
    public long Sid { get; init; }
    public string Code { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public bool UseFlag { get; init; }
    public int DisplayOrderNumber { get; init; }

    /// <summary>True for the small set of seeded base units that may not be deactivated or deleted (see <see cref="Entities.Unit.UnDeleteFlag"/>).</summary>
    public bool UnDeleteFlag { get; init; }

    public string Version { get; init; } = string.Empty;
    public DateTime CreatedDateTime { get; init; }
    public string CreatedName { get; init; } = string.Empty;
    public DateTime ModifiedDateTime { get; init; }
    public string ModifiedName { get; init; } = string.Empty;
}

public class SearchUnitRequest
{
    public bool IncludeInactive { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 20;
    public string? SortKey { get; init; }
    public string SortDirection { get; init; } = SortDirections.Ascending;
}

public class CreateUnitRequest
{
    [Required, StringLength(16)]
    public string Code { get; init; } = string.Empty;

    [Required, StringLength(50)]
    public string Name { get; init; } = string.Empty;

    public bool UseFlag { get; init; } = true;
}

public class UpdateUnitRequest
{
    [Required, StringLength(16)]
    public string Code { get; init; } = string.Empty;

    [Required, StringLength(50)]
    public string Name { get; init; } = string.Empty;

    public bool UseFlag { get; init; } = true;

    [Required]
    public string Version { get; init; } = string.Empty;
}
