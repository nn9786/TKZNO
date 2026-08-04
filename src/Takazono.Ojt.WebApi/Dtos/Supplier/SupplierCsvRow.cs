using CsvHelper.Configuration.Attributes;

namespace Takazono.Ojt.WebApi.Dtos.Supplier;

public class SupplierCsvRow
{
    [Name("取引先コード")] public string Code { get; init; } = string.Empty;
    [Name("取引先名称")] public string Name { get; init; } = string.Empty;
    [Name("取引先区分")] public string SupplierTypeKubun { get; init; } = string.Empty;
    [Name("法人番号")] public string? CorporateNumber { get; init; }
    [Name("郵便番号")] public string? PostalCode { get; init; }
    [Name("住所")] public string? Address { get; init; }
    [Name("電話番号")] public string? PhoneNumber { get; init; }
    [Name("与信限度額")] public decimal? CreditLimit { get; init; }
    [Name("取引開始日")] public string TransactionStartDate { get; init; } = string.Empty;
    [Name("使用区分")] public string UseFlag { get; init; } = string.Empty;
    [Name("表示順")] public int DisplayOrderNumber { get; init; }
}
