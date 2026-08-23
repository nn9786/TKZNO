using System.ComponentModel.DataAnnotations;
using Takazono.Ojt.WebApi.Common;

namespace Takazono.Ojt.WebApi.Dtos.User;

public class UserDto
{
    public long Sid { get; init; }
    public string UserName { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Role { get; init; } = string.Empty;
    public bool UseFlag { get; init; }
    public string Version { get; init; } = string.Empty;
    public DateTime CreatedDateTime { get; init; }
    public string CreatedName { get; init; } = string.Empty;
    public DateTime ModifiedDateTime { get; init; }
    public string ModifiedName { get; init; } = string.Empty;
}

public class SearchUserRequest
{
    /// <summary>表示名に対するフリーワード検索。半角/全角スペース区切りで複数語を指定した場合はAND条件になる（Storeと同じくTakazono.Oliveの検索仕様を踏襲）。</summary>
    public string? Keyword { get; init; }

    /// <summary>ログインIDの完全一致検索。</summary>
    public string? UserName { get; init; }

    public bool IncludeInactive { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 20;
    public string? SortKey { get; init; }
    public string SortDirection { get; init; } = SortDirections.Ascending;
}

public class CreateUserRequest
{
    [Required, StringLength(50)]
    public string UserName { get; init; } = string.Empty;

    [Required, StringLength(100)]
    public string Name { get; init; } = string.Empty;

    /// <summary>"Admin" または "General"。</summary>
    [Required]
    public string Role { get; init; } = string.Empty;

    public bool UseFlag { get; init; } = true;

    [Required, StringLength(100, MinimumLength = 8)]
    public string Password { get; init; } = string.Empty;

    [Required]
    public string ConfirmPassword { get; init; } = string.Empty;
}

public class UpdateUserRequest
{
    [Required, StringLength(50)]
    public string UserName { get; init; } = string.Empty;

    [Required, StringLength(100)]
    public string Name { get; init; } = string.Empty;

    [Required]
    public string Role { get; init; } = string.Empty;

    public bool UseFlag { get; init; } = true;

    [Required]
    public string Version { get; init; } = string.Empty;
}

/// <summary>パスワード再設定専用。プロフィール編集（<see cref="UpdateUserRequest"/>）とは別アクションにして関心を分離する（Takazono.Oliveの`PasswordResetDialog`相当）。</summary>
public class UpdateUserPasswordRequest
{
    [Required, StringLength(100, MinimumLength = 8)]
    public string Password { get; init; } = string.Empty;

    [Required]
    public string ConfirmPassword { get; init; } = string.Empty;

    [Required]
    public string Version { get; init; } = string.Empty;
}
