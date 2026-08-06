using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Dtos.User;
using Takazono.Ojt.WebApi.Services;

namespace Takazono.Ojt.WebApi.Controllers;

/// <summary>アカウント情報を扱うため、参照を含めて全アクションをAdmin限定にする（Unit/StoreはGeneralも参照可だが、ユーザーマスタはここが異なる）。</summary>
[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/v1/[controller]/[action]")]
public class UserController(IUserService userService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<UserDto>>> Search([FromQuery] SearchUserRequest request, CancellationToken ct) =>
        Ok(await userService.SearchAsync(request, ct));

    [HttpGet("{sid:long}")]
    public async Task<ActionResult<UserDto>> Get(long sid, CancellationToken ct) =>
        Ok(await userService.GetAsync(sid, ct));

    [HttpPost]
    public async Task<ActionResult<UserDto>> Create(CreateUserRequest request, CancellationToken ct) =>
        Ok(await userService.CreateAsync(request, ct));

    [HttpPut("{sid:long}")]
    public async Task<ActionResult<UserDto>> Update(long sid, UpdateUserRequest request, CancellationToken ct) =>
        Ok(await userService.UpdateAsync(sid, request, ct));

    [HttpPut("{sid:long}")]
    public async Task<ActionResult<UserDto>> UpdatePassword(long sid, UpdateUserPasswordRequest request, CancellationToken ct) =>
        Ok(await userService.UpdatePasswordAsync(sid, request, ct));

    [HttpDelete("{sid:long}")]
    public async Task<IActionResult> Delete(long sid, [FromQuery, Required] string version, CancellationToken ct)
    {
        await userService.DeleteAsync(sid, version, ct);
        return NoContent();
    }

    [HttpGet]
    public async Task<IActionResult> DownloadCsv([FromQuery] string? language, CancellationToken ct)
    {
        var bytes = await userService.DownloadCsvAsync(language, ct);
        return File(bytes, "text/csv", "user.csv");
    }
}
