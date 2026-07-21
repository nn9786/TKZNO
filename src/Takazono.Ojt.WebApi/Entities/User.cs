using TakazonoOjt.Api.Common;

namespace TakazonoOjt.Api.Entities;

public class User : BaseEntity
{
    public string UserName { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public RoleKubun Role { get; set; }
    public bool UseFlag { get; set; } = true;
}
