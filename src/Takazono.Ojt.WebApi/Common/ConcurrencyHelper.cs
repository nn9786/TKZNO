using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Takazono.Ojt.WebApi.Common;

/// <summary>Shared helper for applying the client-supplied row-version token before an Update/Delete save, used by every master service.</summary>
public static class ConcurrencyHelper
{
    /// <summary>
    /// Sets <paramref name="entry"/>'s original <see cref="BaseEntity.Version"/> value so EF Core's optimistic
    /// concurrency check runs against it. Throws <see cref="BusinessRuleAppException"/> (400) instead of letting
    /// an unparseable token surface as an unhandled 500.
    /// </summary>
    public static void ApplyVersionOriginalValue<TEntity>(EntityEntry<TEntity> entry, string version)
        where TEntity : BaseEntity
    {
        try
        {
            entry.Property(x => x.Version).OriginalValue = Convert.FromBase64String(version);
        }
        catch (FormatException)
        {
            throw new BusinessRuleAppException("排他制御用のバージョン情報が不正です。画面を再読み込みしてください。");
        }
    }
}
