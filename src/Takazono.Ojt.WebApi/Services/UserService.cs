using System.Globalization;
using System.Text;
using CsvHelper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Data;
using Takazono.Ojt.WebApi.Dtos.User;

namespace Takazono.Ojt.WebApi.Services;

public class UserService(AppDbContext db, ICurrentUserService currentUserService) : IUserService
{
    private static readonly HashSet<string> AllowedSortKeys = new(StringComparer.OrdinalIgnoreCase)
    {
        "userName", "name", "role", "useFlag",
    };

    private static readonly PasswordHasher<Entities.User> Hasher = new();

    public async Task<PagedResult<UserDto>> SearchAsync(SearchUserRequest request, CancellationToken ct)
    {
        var query = db.Users.AsNoTracking().AsQueryable();

        if (!request.IncludeInactive)
        {
            query = query.Where(x => x.UseFlag);
        }

        // フリーワード（表示名、複数語はAND・部分一致）とログインID（完全一致）を別条件として適用する（Storeと同じくTakazono.Oliveの検索仕様に合わせている）。
        foreach (var word in KeywordSearchHelper.Split(request.Keyword))
        {
            query = query.Where(x => x.Name.Contains(word));
        }

        if (!string.IsNullOrWhiteSpace(request.UserName))
        {
            query = query.Where(x => x.UserName == request.UserName);
        }

        var totalCount = await query.CountAsync(ct);

        var sortKey = PagingHelper.ResolveSortKey(request.SortKey, AllowedSortKeys, "userName");
        var descending = PagingHelper.IsDescending(request.SortDirection);

        IOrderedQueryable<Entities.User> sortedQuery = sortKey.ToLowerInvariant() switch
        {
            "name" => descending ? query.OrderByDescending(x => x.Name) : query.OrderBy(x => x.Name),
            "role" => descending ? query.OrderByDescending(x => x.Role) : query.OrderBy(x => x.Role),
            "useflag" => descending ? query.OrderByDescending(x => x.UseFlag) : query.OrderBy(x => x.UseFlag),
            _ => descending ? query.OrderByDescending(x => x.UserName) : query.OrderBy(x => x.UserName),
        };

        return await PagingHelper.BuildAsync(sortedQuery, totalCount, request.PageNumber, request.PageSize, sortKey, descending, ToDto, ct);
    }

    public async Task<UserDto> GetAsync(long sid, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);
        return ToDto(entity);
    }

    public async Task<UserDto> CreateAsync(CreateUserRequest request, CancellationToken ct)
    {
        if (request.Password != request.ConfirmPassword)
        {
            throw new BusinessRuleAppException("パスワードと確認用パスワードが一致しません。");
        }

        if (await db.Users.AnyAsync(x => x.UserName == request.UserName, ct))
        {
            throw new ConflictAppException($"ログインID '{request.UserName}' は既に使用されています。");
        }

        var role = ParseRole(request.Role);

        var entity = new Entities.User
        {
            UserName = request.UserName,
            Name = request.Name,
            Role = role,
            UseFlag = request.UseFlag,
        };
        entity.PasswordHash = Hasher.HashPassword(entity, request.Password);

        db.Users.Add(entity);
        await db.SaveChangesAsync(ct);
        return ToDto(entity);
    }

    public async Task<UserDto> UpdateAsync(long sid, UpdateUserRequest request, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);

        if (await db.Users.AnyAsync(x => x.UserName == request.UserName && x.Sid != sid, ct))
        {
            throw new ConflictAppException($"ログインID '{request.UserName}' は既に使用されています。");
        }

        var role = ParseRole(request.Role);
        var isSelf = currentUserService.Sid == sid;
        var isDemotedOrDeactivated = entity.Role == Entities.RoleKubun.Admin && (role != Entities.RoleKubun.Admin || !request.UseFlag);

        if (isSelf && !request.UseFlag)
        {
            throw new BusinessRuleAppException("自分自身のアカウントを使用中止にすることはできません。");
        }

        if (isDemotedOrDeactivated)
        {
            await EnsureAnotherActiveAdminExistsAsync(sid, ct);
        }

        ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), request.Version);

        entity.UserName = request.UserName;
        entity.Name = request.Name;
        entity.Role = role;
        entity.UseFlag = request.UseFlag;

        await db.SaveChangesAsync(ct);
        return ToDto(entity);
    }

    public async Task<UserDto> UpdatePasswordAsync(long sid, UpdateUserPasswordRequest request, CancellationToken ct)
    {
        if (request.Password != request.ConfirmPassword)
        {
            throw new BusinessRuleAppException("パスワードと確認用パスワードが一致しません。");
        }

        var entity = await FindOrThrowAsync(sid, ct);

        ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), request.Version);

        entity.PasswordHash = Hasher.HashPassword(entity, request.Password);

        await db.SaveChangesAsync(ct);
        return ToDto(entity);
    }

    public async Task DeleteAsync(long sid, string version, CancellationToken ct)
    {
        var entity = await FindOrThrowAsync(sid, ct);

        if (currentUserService.Sid == sid)
        {
            throw new BusinessRuleAppException("自分自身のアカウントを削除することはできません。");
        }

        if (entity.Role == Entities.RoleKubun.Admin)
        {
            await EnsureAnotherActiveAdminExistsAsync(sid, ct);
        }

        ConcurrencyHelper.ApplyVersionOriginalValue(db.Entry(entity), version);
        db.Users.Remove(entity);
        await db.SaveChangesAsync(ct);
    }

    /// <summary>操作対象を除いて、有効な管理者が他に1人以上いることを確認する（Takazono.Oliveの`CheckUpdateDeleteUserAsync`相当。全体でAdminが0人になるロックアウトを防ぐ）。</summary>
    private async Task EnsureAnotherActiveAdminExistsAsync(long excludingSid, CancellationToken ct)
    {
        var hasOtherActiveAdmin = await db.Users.AnyAsync(
            x => x.Sid != excludingSid && x.Role == Entities.RoleKubun.Admin && x.UseFlag, ct);

        if (!hasOtherActiveAdmin)
        {
            throw new BusinessRuleAppException("有効な管理者が他にいなくなるため、この操作はできません。");
        }
    }

    private static Entities.RoleKubun ParseRole(string role) =>
        Enum.TryParse<Entities.RoleKubun>(role, out var parsed) ? parsed : throw new BusinessRuleAppException($"ロール '{role}' は不正です。");

    private async Task<Entities.User> FindOrThrowAsync(long sid, CancellationToken ct) =>
        await db.Users.FindAsync([sid], ct) ?? throw new NotFoundAppException($"ユーザー(Sid={sid})が見つかりません。");

    public async Task<byte[]> DownloadCsvAsync(string? language, CancellationToken ct)
    {
        var rows = await db.Users
            .AsNoTracking()
            .OrderBy(x => x.UserName)
            .ToListAsync(ct);

        using var memoryStream = new MemoryStream();

        if (string.Equals(language, "en", StringComparison.OrdinalIgnoreCase))
        {
            var enRows = rows.Select(ToCsvRowEn);
            await using var writer = new StreamWriter(memoryStream, new UTF8Encoding(true), leaveOpen: true);
            await using var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);
            await csv.WriteRecordsAsync(enRows, ct);
        }
        else
        {
            var jaRows = rows.Select(ToCsvRow);
            await using var writer = new StreamWriter(memoryStream, Encoding.GetEncoding("shift_jis"), leaveOpen: true);
            await using var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);
            await csv.WriteRecordsAsync(jaRows, ct);
        }

        return memoryStream.ToArray();
    }

    private static UserCsvRow ToCsvRow(Entities.User x) => new()
    {
        UserName = x.UserName,
        Name = x.Name,
        Role = x.Role == Entities.RoleKubun.Admin ? "管理者" : "一般",
        UseFlag = x.UseFlag ? "○" : string.Empty,
    };

    private static UserCsvRowEn ToCsvRowEn(Entities.User x) => new()
    {
        UserName = x.UserName,
        Name = x.Name,
        Role = x.Role.ToString(),
        UseFlag = x.UseFlag ? "Y" : string.Empty,
    };

    private static UserDto ToDto(Entities.User x) => new()
    {
        Sid = x.Sid,
        UserName = x.UserName,
        Name = x.Name,
        Role = x.Role.ToString(),
        UseFlag = x.UseFlag,
        Version = Convert.ToBase64String(x.Version),
        CreatedDateTime = x.CreatedDateTime,
        CreatedName = x.CreatedName,
        ModifiedDateTime = x.ModifiedDateTime,
        ModifiedName = x.ModifiedName,
    };
}
