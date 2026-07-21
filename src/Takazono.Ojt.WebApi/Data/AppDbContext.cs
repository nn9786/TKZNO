using Microsoft.EntityFrameworkCore;
using TakazonoOjt.Api.Common;
using TakazonoOjt.Api.Entities;

namespace TakazonoOjt.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Unit> Units => Set<Unit>();
    public DbSet<Store> Stores => Set<Store>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        ConfigureBaseEntity<Unit>(modelBuilder, "m_unit");
        ConfigureBaseEntity<Store>(modelBuilder, "m_store");
        ConfigureBaseEntity<User>(modelBuilder, "users");

        modelBuilder.Entity<Unit>(e =>
        {
            e.Property(x => x.Code).HasColumnName("code").HasMaxLength(16).IsRequired();
            e.Property(x => x.Name).HasColumnName("name").HasMaxLength(50).IsRequired();
            e.Property(x => x.UseFlag).HasColumnName("use_flag");
            e.Property(x => x.DisplayOrderNumber).HasColumnName("display_order_number");
            e.HasIndex(x => x.Code).IsUnique();
        });

        modelBuilder.Entity<Store>(e =>
        {
            e.Property(x => x.Code).HasColumnName("code").HasMaxLength(16).IsRequired();
            e.Property(x => x.Name).HasColumnName("name").HasMaxLength(50).IsRequired();
            e.Property(x => x.PostalCode).HasColumnName("postal_code").HasMaxLength(8);
            e.Property(x => x.Address).HasColumnName("address").HasMaxLength(200);
            e.Property(x => x.PhoneNumber).HasColumnName("phone_number").HasMaxLength(20);
            e.Property(x => x.UseFlag).HasColumnName("use_flag");
            e.Property(x => x.DisplayOrderNumber).HasColumnName("display_order_number");
            e.HasIndex(x => x.Code).IsUnique();
        });

        modelBuilder.Entity<User>(e =>
        {
            e.Property(x => x.UserName).HasColumnName("user_name").HasMaxLength(50).IsRequired();
            e.Property(x => x.PasswordHash).HasColumnName("password_hash").HasMaxLength(200).IsRequired();
            e.Property(x => x.Role).HasColumnName("role");
            e.Property(x => x.UseFlag).HasColumnName("use_flag");
            e.HasIndex(x => x.UserName).IsUnique();
        });
    }

    /// <summary>Applies the common BaseEntity column naming/identity/concurrency conventions shared by every master table.</summary>
    private static void ConfigureBaseEntity<TEntity>(ModelBuilder modelBuilder, string tableName)
        where TEntity : BaseEntity
    {
        modelBuilder.Entity<TEntity>(e =>
        {
            e.ToTable(tableName);
            e.HasKey(x => x.Sid);
            e.Property(x => x.Sid).HasColumnName("sid").UseIdentityColumn(seed: 1, increment: 1);
            e.Property(x => x.Version).HasColumnName("version").IsRowVersion();
            e.Property(x => x.CreatedDateTime).HasColumnName("created_date_time");
            e.Property(x => x.CreatedSid).HasColumnName("created_sid");
            e.Property(x => x.CreatedName).HasColumnName("created_name").HasMaxLength(50);
            e.Property(x => x.ModifiedDateTime).HasColumnName("modified_date_time");
            e.Property(x => x.ModifiedSid).HasColumnName("modified_sid");
            e.Property(x => x.ModifiedName).HasColumnName("modified_name").HasMaxLength(50);
        });
    }
}
