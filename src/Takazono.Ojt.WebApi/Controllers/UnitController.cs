using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Dtos.Unit;
using Takazono.Ojt.WebApi.Services;

namespace Takazono.Ojt.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/[controller]/[action]")]
public class UnitController(IUnitService unitService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<UnitDto>>> Search([FromQuery] SearchUnitRequest request, CancellationToken ct) =>
        Ok(await unitService.SearchAsync(request, ct));

    /// <summary>ページングなし全件取得（有効なもののみ）。他マスタからの単位選択セレクトボックス向け。</summary>
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<UnitDto>>> GetAll(CancellationToken ct) =>
        Ok(await unitService.GetAllAsync(ct));

    [HttpGet("{sid:long}")]
    public async Task<ActionResult<UnitDto>> Get(long sid, CancellationToken ct) =>
        Ok(await unitService.GetAsync(sid, ct));

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UnitDto>> Create(CreateUnitRequest request, CancellationToken ct) =>
        Ok(await unitService.CreateAsync(request, ct));

    [HttpPut("{sid:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UnitDto>> Update(long sid, UpdateUnitRequest request, CancellationToken ct) =>
        Ok(await unitService.UpdateAsync(sid, request, ct));

    [HttpDelete("{sid:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(long sid, [FromQuery, Required] string version, CancellationToken ct)
    {
        await unitService.DeleteAsync(sid, version, ct);
        return NoContent();
    }

    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateDisplayOrder(UpdateDisplayOrderRequest request, CancellationToken ct)
    {
        await unitService.UpdateDisplayOrderAsync(request, ct);
        return NoContent();
    }

    [HttpGet]
    public async Task<IActionResult> DownloadCsv([FromQuery] string? language, CancellationToken ct)
    {
        var bytes = await unitService.DownloadCsvAsync(language, ct);
        return File(bytes, "text/csv", "unit.csv");
    }
}
