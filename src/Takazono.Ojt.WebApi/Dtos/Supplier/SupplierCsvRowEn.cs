using CsvHelper.Configuration.Attributes;

namespace Takazono.Ojt.WebApi.Dtos.Supplier;

/// <summary>English-header counterpart of <see cref="SupplierCsvRow"/>, used when the CSV export is requested with language=en.</summary>
public class SupplierCsvRowEn
{
    [Name("Supplier Code")] public string Code { get; init; } = string.Empty;
    [Name("Supplier Name")] public string Name { get; init; } = string.Empty;
    [Name("Supplier Type")] public string SupplierTypeKubun { get; init; } = string.Empty;
    [Name("Corporate Number")] public string? CorporateNumber { get; init; }
    [Name("Postal Code")] public string? PostalCode { get; init; }
    [Name("Address")] public string? Address { get; init; }
    [Name("Phone Number")] public string? PhoneNumber { get; init; }
    [Name("Credit Limit")] public decimal? CreditLimit { get; init; }
    [Name("Transaction Start Date")] public string TransactionStartDate { get; init; } = string.Empty;
    [Name("Use Status")] public string UseFlag { get; init; } = string.Empty;
    [Name("Display Order")] public int DisplayOrderNumber { get; init; }
}
