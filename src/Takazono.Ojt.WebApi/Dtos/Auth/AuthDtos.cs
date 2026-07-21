using System.ComponentModel.DataAnnotations;

namespace TakazonoOjt.Api.Dtos.Auth;

public class LoginRequest
{
    [Required]
    public string UserName { get; init; } = string.Empty;

    [Required]
    public string Password { get; init; } = string.Empty;
}

public class LoginResponse
{
    public string Token { get; init; } = string.Empty;
    public string UserName { get; init; } = string.Empty;
    public string Role { get; init; } = string.Empty;
    public DateTime ExpiresAtUtc { get; init; }
}
