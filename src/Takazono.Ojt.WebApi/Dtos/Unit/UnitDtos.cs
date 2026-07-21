using System.ComponentModel.DataAnnotations;

namespace TakazonoOjt.Api.Dtos.Unit;

public class UnitDto
{
    public long Sid { get; init; }
    public string Code { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public bool UseFlag { get; init; }
    public int DisplayOrderNumber { get; init; }
    public string Version { get; init; } = string.Empty;
}

public class SearchUnitRequest
{
    public string? Keyword { get; init; }
    public bool IncludeInactive { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 20;
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
