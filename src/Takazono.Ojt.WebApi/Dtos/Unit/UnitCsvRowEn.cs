using CsvHelper.Configuration.Attributes;

namespace Takazono.Ojt.WebApi.Dtos.Unit;

/// <summary>English-header counterpart of <see cref="UnitCsvRow"/>, used when the CSV export is requested with language=en.</summary>
public class UnitCsvRowEn
{
    [Name("Unit Code")] public string Code { get; init; } = string.Empty;
    [Name("Unit Name")] public string Name { get; init; } = string.Empty;
    [Name("Use Status")] public string UseFlag { get; init; } = string.Empty;
    [Name("Display Order")] public int DisplayOrderNumber { get; init; }
}
