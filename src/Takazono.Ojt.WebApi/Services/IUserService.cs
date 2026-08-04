using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Dtos.User;

namespace Takazono.Ojt.WebApi.Services;

public interface IUserService
{
    Task<PagedResult<UserDto>> SearchAsync(SearchUserRequest request, CancellationToken ct);
    Task<UserDto> GetAsync(long sid, CancellationToken ct);
    Task<UserDto> CreateAsync(CreateUserRequest request, CancellationToken ct);
    Task<UserDto> UpdateAsync(long sid, UpdateUserRequest request, CancellationToken ct);
    Task UpdatePasswordAsync(long sid, UpdateUserPasswordRequest request, CancellationToken ct);
    Task DeleteAsync(long sid, string version, CancellationToken ct);
    Task<byte[]> DownloadCsvAsync(string? language, CancellationToken ct);
}
