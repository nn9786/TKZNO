using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Dtos.Customer;

namespace Takazono.Ojt.WebApi.Services;

public interface ICustomerService
{
    Task<PagedResult<CustomerDto>> SearchAsync(SearchCustomerRequest request, CancellationToken ct);
    Task<CustomerDto> GetAsync(long sid, CancellationToken ct);
    Task<CustomerDto> CreateAsync(CreateCustomerRequest request, CancellationToken ct);
    Task<CustomerDto> UpdateAsync(long sid, UpdateCustomerRequest request, CancellationToken ct);
    Task DeleteAsync(long sid, string version, CancellationToken ct);
    Task UpdateDisplayOrderAsync(UpdateDisplayOrderRequest request, CancellationToken ct);
}
