using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Takazono.Ojt.WebApi.Common;

/// <summary>
/// Stamps every <see cref="BaseEntity"/>'s Created*/Modified* audit columns on save, and translates EF
/// Core's <see cref="DbUpdateConcurrencyException"/> into <see cref="ConcurrencyConflictAppException"/>
/// before it is even thrown, so no service needs to duplicate either concern.
/// Mirrors the role of Takazono.Olive/Core's `EntitySaveChangesInterceptor` (minus its MediatR
/// domain-event dispatch, which this teaching project intentionally omits — see
/// docs/training-material-plan.md §2.4). Registered once on <see cref="Data.AppDbContext"/> in
/// Program.cs, so it runs for every entity on every SaveChanges call.
/// </summary>
public class AuditSaveChangesInterceptor(ICurrentUserService currentUserService) : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        StampAuditFields(eventData.Context);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
        StampAuditFields(eventData.Context);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    /// <summary>Called by EF Core right before it would throw <see cref="DbUpdateConcurrencyException"/>; throwing here replaces it entirely.</summary>
    public override InterceptionResult ThrowingConcurrencyException(ConcurrencyExceptionEventData eventData, InterceptionResult result) =>
        throw new ConcurrencyConflictAppException("他のユーザーによって更新されています。画面を再読み込みしてください。");

    public override ValueTask<InterceptionResult> ThrowingConcurrencyExceptionAsync(
        ConcurrencyExceptionEventData eventData, InterceptionResult result, CancellationToken cancellationToken = default) =>
        throw new ConcurrencyConflictAppException("他のユーザーによって更新されています。画面を再読み込みしてください。");

    private void StampAuditFields(DbContext? context)
    {
        if (context is null) return;

        var now = DateTime.Now;
        var sid = currentUserService.Sid;
        var name = currentUserService.UserName;

        foreach (var entry in context.ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedDateTime = now;
                entry.Entity.CreatedSid = sid;
                entry.Entity.CreatedName = name;
            }

            if (entry.State is EntityState.Added or EntityState.Modified)
            {
                entry.Entity.ModifiedDateTime = now;
                entry.Entity.ModifiedSid = sid;
                entry.Entity.ModifiedName = name;
            }
        }
    }
}
