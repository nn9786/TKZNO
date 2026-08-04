using CsvHelper.Configuration.Attributes;

namespace Takazono.Ojt.WebApi.Dtos.User;

/// <summary>English-header counterpart of <see cref="UserCsvRow"/>, used when the CSV export is requested with language=en.</summary>
public class UserCsvRowEn
{
    [Name("Login ID")] public string UserName { get; init; } = string.Empty;
    [Name("Display Name")] public string Name { get; init; } = string.Empty;
    [Name("Role")] public string Role { get; init; } = string.Empty;
    [Name("Use Status")] public string UseFlag { get; init; } = string.Empty;
}
