using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Dtos.Unit;

namespace Takazono.Ojt.WebApi.Services;

public interface IUnitService
{
    Task<PagedResult<UnitDto>> SearchAsync(SearchUnitRequest request, CancellationToken ct);
    Task<IReadOnlyList<UnitDto>> GetAllAsync(CancellationToken ct);
    Task<UnitDto> GetAsync(long sid, CancellationToken ct);
    Task<UnitDto> CreateAsync(CreateUnitRequest request, CancellationToken ct);
    Task<UnitDto> UpdateAsync(long sid, UpdateUnitRequest request, CancellationToken ct);
    Task DeleteAsync(long sid, string version, CancellationToken ct);
    Task UpdateDisplayOrderAsync(UpdateDisplayOrderRequest request, CancellationToken ct);
}
