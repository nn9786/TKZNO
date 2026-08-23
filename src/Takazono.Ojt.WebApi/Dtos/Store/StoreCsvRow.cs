using CsvHelper.Configuration.Attributes;

namespace Takazono.Ojt.WebApi.Dtos.Store;

public class StoreCsvRow
{
    [Name("店舗コード")] public string Code { get; init; } = string.Empty;
    [Name("店舗名称")] public string Name { get; init; } = string.Empty;
    [Name("郵便番号")] public string? PostalCode { get; init; }
    [Name("住所")] public string? Address { get; init; }
    [Name("電話番号")] public string? PhoneNumber { get; init; }
    [Name("使用区分")] public string UseFlag { get; init; } = string.Empty;
    [Name("表示順")] public int DisplayOrderNumber { get; init; }
}
