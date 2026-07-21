using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Dtos.Store;
using Takazono.Ojt.WebApi.Services;

namespace Takazono.Ojt.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/[controller]/[action]")]
public class StoreController(IStoreService storeService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<StoreDto>>> Search([FromQuery] SearchStoreRequest request, CancellationToken ct) =>
        Ok(await storeService.SearchAsync(request, ct));

    [HttpGet("{sid:long}")]
    public async Task<ActionResult<StoreDto>> Get(long sid, CancellationToken ct) =>
        Ok(await storeService.GetAsync(sid, ct));

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<StoreDto>> Create(CreateStoreRequest request, CancellationToken ct) =>
        Ok(await storeService.CreateAsync(request, ct));

    [HttpPut("{sid:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<StoreDto>> Update(long sid, UpdateStoreRequest request, CancellationToken ct) =>
        Ok(await storeService.UpdateAsync(sid, request, ct));

    [HttpDelete("{sid:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(long sid, CancellationToken ct)
    {
        await storeService.DeleteAsync(sid, ct);
        return NoContent();
    }

    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateDisplayOrder(UpdateDisplayOrderRequest request, CancellationToken ct)
    {
        await storeService.UpdateDisplayOrderAsync(request, ct);
        return NoContent();
    }
}
