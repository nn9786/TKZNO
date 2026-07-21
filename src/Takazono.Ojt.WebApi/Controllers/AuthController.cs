using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TakazonoOjt.Api.Auth;
using TakazonoOjt.Api.Data;
using TakazonoOjt.Api.Dtos.Auth;
using TakazonoOjt.Api.Entities;

namespace TakazonoOjt.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]/[action]")]
public class AuthController(AppDbContext db, JwtTokenService tokenService) : ControllerBase
{
    private static readonly PasswordHasher<User> Hasher = new();

    [HttpPost]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request, CancellationToken ct)
    {
        var user = await db.Users.SingleOrDefaultAsync(u => u.UserName == request.UserName && u.UseFlag, ct);
        if (user is null || Hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
        {
            return Unauthorized();
        }

        var (token, expiresAtUtc) = tokenService.CreateToken(user);
        return Ok(new LoginResponse
        {
            Token = token,
            UserName = user.UserName,
            Role = user.Role.ToString(),
            ExpiresAtUtc = expiresAtUtc,
        });
    }
}
