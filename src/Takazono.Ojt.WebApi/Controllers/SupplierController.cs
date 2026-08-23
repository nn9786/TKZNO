using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Dtos.Supplier;
using Takazono.Ojt.WebApi.Services;

namespace Takazono.Ojt.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/[controller]/[action]")]
public class SupplierController(ISupplierService supplierService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<SupplierDto>>> Search([FromQuery] SearchSupplierRequest request, CancellationToken ct) =>
        Ok(await supplierService.SearchAsync(request, ct));

    [HttpGet("{sid:long}")]
    public async Task<ActionResult<SupplierDto>> Get(long sid, CancellationToken ct) =>
        Ok(await supplierService.GetAsync(sid, ct));

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<SupplierDto>> Create(CreateSupplierRequest request, CancellationToken ct) =>
        Ok(await supplierService.CreateAsync(request, ct));

    [HttpPut("{sid:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<SupplierDto>> Update(long sid, UpdateSupplierRequest request, CancellationToken ct) =>
        Ok(await supplierService.UpdateAsync(sid, request, ct));

    [HttpDelete("{sid:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(long sid, [FromQuery, Required] string version, CancellationToken ct)
    {
        await supplierService.DeleteAsync(sid, version, ct);
        return NoContent();
    }

    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateDisplayOrder(UpdateDisplayOrderRequest request, CancellationToken ct)
    {
        await supplierService.UpdateDisplayOrderAsync(request, ct);
        return NoContent();
    }

    [HttpGet]
    public async Task<IActionResult> DownloadCsv([FromQuery] string? language, CancellationToken ct)
    {
        var bytes = await supplierService.DownloadCsvAsync(language, ct);
        return File(bytes, "text/csv", "supplier.csv");
    }
}
