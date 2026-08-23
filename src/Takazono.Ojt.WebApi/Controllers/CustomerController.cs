using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Dtos.Customer;
using Takazono.Ojt.WebApi.Services;

namespace Takazono.Ojt.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/[controller]/[action]")]
public class CustomerController(ICustomerService customerService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<CustomerDto>>> Search([FromQuery] SearchCustomerRequest request, CancellationToken ct) =>
        Ok(await customerService.SearchAsync(request, ct));

    [HttpGet("{sid:long}")]
    public async Task<ActionResult<CustomerDto>> Get(long sid, CancellationToken ct) =>
        Ok(await customerService.GetAsync(sid, ct));

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CustomerDto>> Create(CreateCustomerRequest request, CancellationToken ct) =>
        Ok(await customerService.CreateAsync(request, ct));

    [HttpPut("{sid:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CustomerDto>> Update(long sid, UpdateCustomerRequest request, CancellationToken ct) =>
        Ok(await customerService.UpdateAsync(sid, request, ct));

    [HttpDelete("{sid:long}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(long sid, [FromQuery, Required] string version, CancellationToken ct)
    {
        await customerService.DeleteAsync(sid, version, ct);
        return NoContent();
    }

    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateDisplayOrder(UpdateDisplayOrderRequest request, CancellationToken ct)
    {
        await customerService.UpdateDisplayOrderAsync(request, ct);
        return NoContent();
    }
}
