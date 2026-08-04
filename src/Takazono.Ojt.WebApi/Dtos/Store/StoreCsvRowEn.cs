using CsvHelper.Configuration.Attributes;

namespace Takazono.Ojt.WebApi.Dtos.Store;

/// <summary>English-header counterpart of <see cref="StoreCsvRow"/>, used when the CSV export is requested with language=en.</summary>
public class StoreCsvRowEn
{
    [Name("Store Code")] public string Code { get; init; } = string.Empty;
    [Name("Store Name")] public string Name { get; init; } = string.Empty;
    [Name("Postal Code")] public string? PostalCode { get; init; }
    [Name("Address")] public string? Address { get; init; }
    [Name("Phone Number")] public string? PhoneNumber { get; init; }
    [Name("Use Status")] public string UseFlag { get; init; } = string.Empty;
    [Name("Display Order")] public int DisplayOrderNumber { get; init; }
}
