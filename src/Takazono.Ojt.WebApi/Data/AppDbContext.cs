using Microsoft.EntityFrameworkCore;
using Takazono.Ojt.WebApi.Common;
using Takazono.Ojt.WebApi.Entities;

namespace Takazono.Ojt.WebApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Unit> Units => Set<Unit>();
    public DbSet<Store> Stores => Set<Store>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Supplier> Suppliers => Set<Supplier>();
    public DbSet<Customer> Customers => Set<Customer>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        ConfigureBaseEntity<Unit>(modelBuilder, "m_unit");
        ConfigureBaseEntity<Store>(modelBuilder, "m_store");
        ConfigureBaseEntity<User>(modelBuilder, "m_user");
        ConfigureBaseEntity<Supplier>(modelBuilder, "m_supplier");
        ConfigureBaseEntity<Customer>(modelBuilder, "m_customer");

        modelBuilder.Entity<Unit>(e =>
        {
            e.Property(x => x.Code).HasColumnName("code").HasMaxLength(16).IsRequired();
            e.Property(x => x.Name).HasColumnName("name").HasMaxLength(50).IsRequired();
            e.Property(x => x.UseFlag).HasColumnName("use_flag");
            e.Property(x => x.DisplayOrderNumber).HasColumnName("display_order_number");
            e.Property(x => x.UnDeleteFlag).HasColumnName("un_delete_flag");
            e.HasIndex(x => x.Code).IsUnique();

            // 固定・不変な区分値マスタ（単位）はMigrationのHasDataで投入する（§2.6の決定通り。業務的なサンプルデータはDevSeeder側で投入）。
            // "個"(EA)は他の将来マスタが既定値として参照し得るため削除保護(UnDeleteFlag)付きで投入する。
            var seedDateTime = new DateTime(2026, 7, 13, 0, 0, 0, DateTimeKind.Unspecified);
            e.HasData(
                new Unit { Sid = 1, Code = "EA", Name = "個", UseFlag = true, DisplayOrderNumber = 1, UnDeleteFlag = true, CreatedDateTime = seedDateTime, ModifiedDateTime = seedDateTime, CreatedName = "seed", ModifiedName = "seed" },
                new Unit { Sid = 2, Code = "BOX", Name = "箱", UseFlag = true, DisplayOrderNumber = 2, UnDeleteFlag = false, CreatedDateTime = seedDateTime, ModifiedDateTime = seedDateTime, CreatedName = "seed", ModifiedName = "seed" },
                new Unit { Sid = 3, Code = "CS", Name = "ケース", UseFlag = true, DisplayOrderNumber = 3, UnDeleteFlag = false, CreatedDateTime = seedDateTime, ModifiedDateTime = seedDateTime, CreatedName = "seed", ModifiedName = "seed" },
                new Unit { Sid = 4, Code = "SET", Name = "セット", UseFlag = true, DisplayOrderNumber = 4, UnDeleteFlag = false, CreatedDateTime = seedDateTime, ModifiedDateTime = seedDateTime, CreatedName = "seed", ModifiedName = "seed" }
            );
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
            e.Property(x => x.Name).HasColumnName("name").HasMaxLength(50).IsRequired();
            e.Property(x => x.PasswordHash).HasColumnName("password_hash").HasMaxLength(200).IsRequired();
            e.Property(x => x.Role).HasColumnName("role");
            e.Property(x => x.UseFlag).HasColumnName("use_flag");
            e.HasIndex(x => x.UserName).IsUnique();
        });

        modelBuilder.Entity<Supplier>(e =>
        {
            e.Property(x => x.Code).HasColumnName("code").HasMaxLength(16).IsRequired();
            e.Property(x => x.Name).HasColumnName("name").HasMaxLength(50).IsRequired();
            e.Property(x => x.SupplierTypeKubun).HasColumnName("supplier_type_kubun");
            e.Property(x => x.CorporateNumber).HasColumnName("corporate_number").HasMaxLength(13);
            e.Property(x => x.PostalCode).HasColumnName("postal_code").HasMaxLength(8);
            e.Property(x => x.Address).HasColumnName("address").HasMaxLength(200);
            e.Property(x => x.PhoneNumber).HasColumnName("phone_number").HasMaxLength(20);
            e.Property(x => x.CreditLimit).HasColumnName("credit_limit").HasColumnType("decimal(18,2)");
            e.Property(x => x.TransactionStartDate).HasColumnName("transaction_start_date");
            e.Property(x => x.UseFlag).HasColumnName("use_flag");
            e.Property(x => x.DisplayOrderNumber).HasColumnName("display_order_number");
            e.HasIndex(x => x.Code).IsUnique();
        });

        modelBuilder.Entity<Customer>(e =>
        {
            e.Property(x => x.Code).HasColumnName("code").HasMaxLength(16).IsRequired();
            e.Property(x => x.Name).HasColumnName("name").HasMaxLength(50).IsRequired();
            e.Property(x => x.CustomerRankKubun).HasColumnName("customer_rank_kubun");
            e.Property(x => x.PreferentialDiscountRate).HasColumnName("preferential_discount_rate").HasColumnType("decimal(5,2)");
            e.Property(x => x.PostalCode).HasColumnName("postal_code").HasMaxLength(8);
            e.Property(x => x.Address).HasColumnName("address").HasMaxLength(200);
            e.Property(x => x.PhoneNumber).HasColumnName("phone_number").HasMaxLength(20);
            e.Property(x => x.ContractStartDate).HasColumnName("contract_start_date");
            e.Property(x => x.ContractEndDate).HasColumnName("contract_end_date");
            e.Property(x => x.UseFlag).HasColumnName("use_flag");
            e.Property(x => x.DisplayOrderNumber).HasColumnName("display_order_number");
            e.HasIndex(x => x.Code).IsUnique();
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
