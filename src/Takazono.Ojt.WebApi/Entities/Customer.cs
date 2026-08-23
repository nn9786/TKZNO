using Takazono.Ojt.WebApi.Common;

namespace Takazono.Ojt.WebApi.Entities;

/// <summary>得意先マスタ — 取引先と同じ難易度帯の類似マスタだが、単一日付ではなく日付範囲・数値割引率という別軸で差異を持たせている。</summary>
public class Customer : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public CustomerRankKubun CustomerRankKubun { get; set; }

    /// <summary>優遇割引率(0〜100)。<see cref="CustomerRankKubun"/>が優良の場合のみ必須(DTO側のIValidatableObjectで検証)。</summary>
    public decimal? PreferentialDiscountRate { get; set; }

    public string? PostalCode { get; set; }
    public string? Address { get; set; }
    public string? PhoneNumber { get; set; }

    public DateTime ContractStartDate { get; set; }

    /// <summary>契約終了日。未設定(null)は無期限契約を表す。設定する場合は契約開始日以降であることをDTO側で検証する。</summary>
    public DateTime? ContractEndDate { get; set; }

    public bool UseFlag { get; set; } = true;
    public int DisplayOrderNumber { get; set; }
}
