using System.ComponentModel.DataAnnotations;
using Takazono.Ojt.WebApi.Common;

namespace Takazono.Ojt.WebApi.Dtos.Supplier;

public class SupplierDto
{
    public long Sid { get; init; }
    public string Code { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string SupplierTypeKubun { get; init; } = string.Empty;
    public string? CorporateNumber { get; init; }
    public string? PostalCode { get; init; }
    public string? Address { get; init; }
    public string? PhoneNumber { get; init; }
    public decimal? CreditLimit { get; init; }
    public DateTime TransactionStartDate { get; init; }
    public bool UseFlag { get; init; }
    public int DisplayOrderNumber { get; init; }
    public string Version { get; init; } = string.Empty;
    public DateTime CreatedDateTime { get; init; }
    public string CreatedName { get; init; } = string.Empty;
    public DateTime ModifiedDateTime { get; init; }
    public string ModifiedName { get; init; } = string.Empty;
}

public class SearchSupplierRequest
{
    /// <summary>取引先名称に対するフリーワード検索(半角/全角スペース区切りでAND条件、Storeと同じ仕様)。</summary>
    public string? Keyword { get; init; }

    /// <summary>取引先コードの完全一致検索。</summary>
    public string? Code { get; init; }

    public bool IncludeInactive { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 20;
    public string? SortKey { get; init; }
    public string SortDirection { get; init; } = SortDirections.Ascending;
}

public class CreateSupplierRequest : IValidatableObject
{
    [Required, StringLength(16)]
    public string Code { get; init; } = string.Empty;

    [Required, StringLength(50)]
    public string Name { get; init; } = string.Empty;

    /// <summary>"Corporate" または "Individual"。</summary>
    [Required]
    public string SupplierTypeKubun { get; init; } = string.Empty;

    [StringLength(13)]
    public string? CorporateNumber { get; init; }

    [StringLength(8)]
    public string? PostalCode { get; init; }

    [StringLength(200)]
    public string? Address { get; init; }

    [StringLength(20)]
    public string? PhoneNumber { get; init; }

    [Range(0, double.MaxValue)]
    public decimal? CreditLimit { get; init; }

    [Required]
    public DateTime TransactionStartDate { get; init; }

    public bool UseFlag { get; init; } = true;

    /// <summary>区分による条件付き必須(法人の場合のみ法人番号が必須)をモデルレベルの横断検証として表現する。</summary>
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.Equals(SupplierTypeKubun, "Corporate", StringComparison.OrdinalIgnoreCase) && string.IsNullOrWhiteSpace(CorporateNumber))
        {
            yield return new ValidationResult("Corporate number is required when supplier type is Corporate.", [nameof(CorporateNumber)]);
        }
    }
}

public class UpdateSupplierRequest : IValidatableObject
{
    [Required, StringLength(16)]
    public string Code { get; init; } = string.Empty;

    [Required, StringLength(50)]
    public string Name { get; init; } = string.Empty;

    [Required]
    public string SupplierTypeKubun { get; init; } = string.Empty;

    [StringLength(13)]
    public string? CorporateNumber { get; init; }

    [StringLength(8)]
    public string? PostalCode { get; init; }

    [StringLength(200)]
    public string? Address { get; init; }

    [StringLength(20)]
    public string? PhoneNumber { get; init; }

    [Range(0, double.MaxValue)]
    public decimal? CreditLimit { get; init; }

    [Required]
    public DateTime TransactionStartDate { get; init; }

    public bool UseFlag { get; init; } = true;

    [Required]
    public string Version { get; init; } = string.Empty;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.Equals(SupplierTypeKubun, "Corporate", StringComparison.OrdinalIgnoreCase) && string.IsNullOrWhiteSpace(CorporateNumber))
        {
            yield return new ValidationResult("Corporate number is required when supplier type is Corporate.", [nameof(CorporateNumber)]);
        }
    }
}
