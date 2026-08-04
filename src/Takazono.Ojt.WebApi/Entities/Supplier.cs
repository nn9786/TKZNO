using Takazono.Ojt.WebApi.Common;

namespace Takazono.Ojt.WebApi.Entities;

/// <summary>取引先(仕入先)マスタ — 単位/店舗より一段難しいマスタの「手本」。区分依存の条件付き必須と、状態依存のビジネスルールを学ぶ。</summary>
public class Supplier : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public SupplierTypeKubun SupplierTypeKubun { get; set; }

    /// <summary>法人番号(13桁)。<see cref="SupplierTypeKubun"/>が法人の場合のみ必須(DTO側のIValidatableObjectで検証)。</summary>
    public string? CorporateNumber { get; set; }

    public string? PostalCode { get; set; }
    public string? Address { get; set; }
    public string? PhoneNumber { get; set; }

    /// <summary>
    /// 与信限度額。値が設定されている取引先は区分を「個人」に変更できない(サービス層のビジネスルール)。
    /// </summary>
    public decimal? CreditLimit { get; set; }

    public DateTime TransactionStartDate { get; set; }
    public bool UseFlag { get; set; } = true;
    public int DisplayOrderNumber { get; set; }
}
