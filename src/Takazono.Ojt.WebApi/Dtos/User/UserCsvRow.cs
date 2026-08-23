using CsvHelper.Configuration.Attributes;

namespace Takazono.Ojt.WebApi.Dtos.User;

public class UserCsvRow
{
    [Name("ログインID")] public string UserName { get; init; } = string.Empty;
    [Name("表示名")] public string Name { get; init; } = string.Empty;
    [Name("権限")] public string Role { get; init; } = string.Empty;
    [Name("使用区分")] public string UseFlag { get; init; } = string.Empty;
}
