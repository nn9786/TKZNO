namespace Takazono.Ojt.WebApi.Common;

/// <summary>Splits a free-word search box's raw input into individual keywords, shared by every master search whose spec matches Takazono.Olive's `filterFreeWord`.</summary>
public static class KeywordSearchHelper
{
    public static string[] Split(string? keyword) =>
        string.IsNullOrWhiteSpace(keyword)
            ? []
            : keyword.Split([' ', '　'], StringSplitOptions.RemoveEmptyEntries);
}
