using System.ComponentModel.DataAnnotations;
using Takazono.Ojt.WebApi.Common;

namespace Takazono.Ojt.WebApi.Dtos.Customer;

public class CustomerDto
{
    public long Sid { get; init; }
    public string Code { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string CustomerRankKubun { get; init; } = string.Empty;
    public decimal? PreferentialDiscountRate { get; init; }
    public string? PostalCode { get; init; }
    public string? Address { get; init; }
    public string? PhoneNumber { get; init; }
    public DateTime ContractStartDate { get; init; }
    public DateTime? ContractEndDate { get; init; }
    public bool UseFlag { get; init; }
    public int DisplayOrderNumber { get; init; }
    public string Version { get; init; } = string.Empty;
    public DateTime CreatedDateTime { get; init; }
    public string CreatedName { get; init; } = string.Empty;
    public DateTime ModifiedDateTime { get; init; }
    public string ModifiedName { get; init; } = string.Empty;
}

/// <summary>
/// Unitと同じく検索条件(フリーワード/コード)を持たない簡易な一覧向けリクエスト
/// (Storeが持つ検索条件を敢えて省略し、Unit側の「使用中止も表示」のみで全件取得するパターンを踏襲)。
/// </summary>
public class SearchCustomerRequest
{
    public bool IncludeInactive { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 20;
    public string? SortKey { get; init; }
    public string SortDirection { get; init; } = SortDirections.Ascending;
}

public class CreateCustomerRequest : IValidatableObject
{
    [Required, StringLength(16)]
    public string Code { get; init; } = string.Empty;

    [Required, StringLength(50)]
    public string Name { get; init; } = string.Empty;

    /// <summary>"Standard"、"Premium"、"New" のいずれか。</summary>
    [Required]
    public string CustomerRankKubun { get; init; } = string.Empty;

    [Range(0, 100)]
    public decimal? PreferentialDiscountRate { get; init; }

    [StringLength(8)]
    public string? PostalCode { get; init; }

    [StringLength(200)]
    public string? Address { get; init; }

    [StringLength(20)]
    public string? PhoneNumber { get; init; }

    [Required]
    public DateTime ContractStartDate { get; init; }

    /// <summary>未指定(null)は無期限契約を表す。</summary>
    public DateTime? ContractEndDate { get; init; }

    public bool UseFlag { get; init; } = true;

    /// <summary>区分依存の条件付き必須(優良の場合のみ割引率が必須)と、日付範囲の整合性(終了日≧開始日)を検証する。</summary>
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.Equals(CustomerRankKubun, "Premium", StringComparison.OrdinalIgnoreCase) && PreferentialDiscountRate is null)
        {
            yield return new ValidationResult("Preferential discount rate is required when customer rank is Premium.", [nameof(PreferentialDiscountRate)]);
        }

        if (ContractEndDate is { } endDate && endDate < ContractStartDate)
        {
            yield return new ValidationResult("Contract end date must be on or after the contract start date.", [nameof(ContractEndDate)]);
        }
    }
}

public class UpdateCustomerRequest : IValidatableObject
{
    [Required, StringLength(16)]
    public string Code { get; init; } = string.Empty;

    [Required, StringLength(50)]
    public string Name { get; init; } = string.Empty;

    [Required]
    public string CustomerRankKubun { get; init; } = string.Empty;

    [Range(0, 100)]
    public decimal? PreferentialDiscountRate { get; init; }

    [StringLength(8)]
    public string? PostalCode { get; init; }

    [StringLength(200)]
    public string? Address { get; init; }

    [StringLength(20)]
    public string? PhoneNumber { get; init; }

    [Required]
    public DateTime ContractStartDate { get; init; }

    public DateTime? ContractEndDate { get; init; }

    public bool UseFlag { get; init; } = true;

    [Required]
    public string Version { get; init; } = string.Empty;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.Equals(CustomerRankKubun, "Premium", StringComparison.OrdinalIgnoreCase) && PreferentialDiscountRate is null)
        {
            yield return new ValidationResult("Preferential discount rate is required when customer rank is Premium.", [nameof(PreferentialDiscountRate)]);
        }

        if (ContractEndDate is { } endDate && endDate < ContractStartDate)
        {
            yield return new ValidationResult("Contract end date must be on or after the contract start date.", [nameof(ContractEndDate)]);
        }
    }
}
