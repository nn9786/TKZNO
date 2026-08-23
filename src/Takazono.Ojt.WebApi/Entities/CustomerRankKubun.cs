namespace Takazono.Ojt.WebApi.Entities;

/// <summary>得意先ランク区分。優良の場合のみ<see cref="Customer.PreferentialDiscountRate"/>が必須になる。</summary>
public enum CustomerRankKubun : byte
{
    Standard = 1,
    Premium = 2,
    New = 3,
}
