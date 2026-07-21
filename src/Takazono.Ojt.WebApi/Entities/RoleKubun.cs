namespace TakazonoOjt.Api.Entities;

/// <summary>Minimal 2-role permission model (Admin: full access, General: read + limited write).</summary>
public enum RoleKubun : byte
{
    Admin = 1,
    General = 2,
}
