namespace Takazono.Ojt.WebApi.Entities;

/// <summary>取引先区分。法人の場合のみ<see cref="Supplier.CorporateNumber"/>が必須になる。</summary>
public enum SupplierTypeKubun : byte
{
    Corporate = 1,
    Individual = 2,
}
