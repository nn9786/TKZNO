using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Dtos.Store;

namespace Takazono.Ojt.WebApi.Services;

public interface IStoreService
{
    Task<PagedResult<StoreDto>> SearchAsync(SearchStoreRequest request, CancellationToken ct);
    Task<IReadOnlyList<StoreDto>> GetAllAsync(CancellationToken ct);
    Task<StoreDto> GetAsync(long sid, CancellationToken ct);
    Task<StoreDto> CreateAsync(CreateStoreRequest request, CancellationToken ct);
    Task<StoreDto> UpdateAsync(long sid, UpdateStoreRequest request, CancellationToken ct);
    Task DeleteAsync(long sid, string version, CancellationToken ct);
    Task UpdateDisplayOrderAsync(UpdateDisplayOrderRequest request, CancellationToken ct);
    Task<byte[]> DownloadCsvAsync(string? language, CancellationToken ct);
}
