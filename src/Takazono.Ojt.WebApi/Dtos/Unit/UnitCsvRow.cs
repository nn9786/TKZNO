using CsvHelper.Configuration.Attributes;

namespace Takazono.Ojt.WebApi.Dtos.Unit;

public class UnitCsvRow
{
    [Name("単位コード")] public string Code { get; init; } = string.Empty;
    [Name("単位名称")] public string Name { get; init; } = string.Empty;
    [Name("使用区分")] public string UseFlag { get; init; } = string.Empty;
    [Name("表示順")] public int DisplayOrderNumber { get; init; }
}
