using System.ComponentModel.DataAnnotations;
using Takazono.Ojt.WebApi.Common;

namespace Takazono.Ojt.WebApi.Dtos.Store;

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
    public DateTime CreatedDateTime { get; init; }
    public string CreatedName { get; init; } = string.Empty;
    public DateTime ModifiedDateTime { get; init; }
    public string ModifiedName { get; init; } = string.Empty;
}

public class SearchStoreRequest
{
    /// <summary>店舗名称に対するフリーワード検索。半角/全角スペース区切りで複数語を指定した場合はAND条件になる（Takazono.Oliveの`FreeWordSearchList`相当）。</summary>
    public string? Keyword { get; init; }

    /// <summary>店舗コードの完全一致検索（Takazono.Oliveの`Code`相当。フリーワードとは別条件）。</summary>
    public string? Code { get; init; }

    public bool IncludeInactive { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 20;
    public string? SortKey { get; init; }
    public string SortDirection { get; init; } = SortDirections.Ascending;
}

public class CreateStoreRequest
{
    [Required, StringLength(16)]
    public string Code { get; init; } = string.Empty;

    [Required, StringLength(100)]
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

    [Required, StringLength(100)]
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
