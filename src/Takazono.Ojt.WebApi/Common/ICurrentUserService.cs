using System.Security.Claims;

namespace Takazono.Ojt.WebApi.Common;

public interface ICurrentUserService
{
    string UserName { get; }

    /// <summary>ログイン中ユーザーのSid（JWTの<see cref="ClaimTypes.NameIdentifier"/>）。未認証時はnull。</summary>
    long? Sid { get; }
}

public class CurrentUserService(IHttpContextAccessor httpContextAccessor) : ICurrentUserService
{
    public string UserName => httpContextAccessor.HttpContext?.User?.Identity?.Name ?? "system";

    public long? Sid
    {
        get
        {
            var value = httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return long.TryParse(value, out var sid) ? sid : null;
        }
    }
}
