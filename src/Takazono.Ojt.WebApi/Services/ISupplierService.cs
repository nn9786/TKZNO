using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Dtos.Supplier;

namespace Takazono.Ojt.WebApi.Services;

public interface ISupplierService
{
    Task<PagedResult<SupplierDto>> SearchAsync(SearchSupplierRequest request, CancellationToken ct);
    Task<SupplierDto> GetAsync(long sid, CancellationToken ct);
    Task<SupplierDto> CreateAsync(CreateSupplierRequest request, CancellationToken ct);
    Task<SupplierDto> UpdateAsync(long sid, UpdateSupplierRequest request, CancellationToken ct);
    Task DeleteAsync(long sid, string version, CancellationToken ct);
    Task UpdateDisplayOrderAsync(UpdateDisplayOrderRequest request, CancellationToken ct);
    Task<byte[]> DownloadCsvAsync(string? language, CancellationToken ct);
}
