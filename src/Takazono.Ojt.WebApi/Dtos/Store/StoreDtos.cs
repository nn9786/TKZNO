using System.ComponentModel.DataAnnotations;

namespace TakazonoOjt.Api.Dtos.Store;

public class StoreDto
{
    public long Sid { get; init; }
    public string Code { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string? PostalCode { get; init; }
    public string? Address { get; init; }
    public string? PhoneNumber { get; init; }
    public bool UseFlag { get; init; }
    public int DisplayOrderNumber { get; init; }
    public string Version { get; init; } = string.Empty;
}

public class SearchStoreRequest
{
    public string? Keyword { get; init; }
    public bool IncludeInactive { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 20;
}

public class CreateStoreRequest
{
    [Required, StringLength(16)]
    public string Code { get; init; } = string.Empty;

    [Required, StringLength(50)]
    public string Name { get; init; } = string.Empty;

    [StringLength(8)]
    public string? PostalCode { get; init; }

    [StringLength(200)]
    public string? Address { get; init; }

    [StringLength(20)]
    public string? PhoneNumber { get; init; }

    public bool UseFlag { get; init; } = true;
}

public class UpdateStoreRequest
{
    [Required, StringLength(16)]
    public string Code { get; init; } = string.Empty;

    [Required, StringLength(50)]
    public string Name { get; init; } = string.Empty;

    [StringLength(8)]
    public string? PostalCode { get; init; }

    [StringLength(200)]
    public string? Address { get; init; }

    [StringLength(20)]
    public string? PhoneNumber { get; init; }

    public bool UseFlag { get; init; } = true;

    [Required]
    public string Version { get; init; } = string.Empty;
}
