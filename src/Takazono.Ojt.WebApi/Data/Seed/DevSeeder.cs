using Microsoft.AspNetCore.Identity;
using Takazono.Ojt.WebApi.Entities;

namespace Takazono.Ojt.WebApi.Data.Seed;

/// <summary>
/// Minimal development sample data. Idempotent (only inserts when a table is empty) so it never
/// clobbers data that learners have created/edited/deleted during exercises.
/// </summary>
public static class DevSeeder
{
    public static void Seed(AppDbContext db)
    {
        var now = DateTime.Now;

        if (!db.Users.Any())
        {
            var hasher = new PasswordHasher<User>();
            var admin = new User { UserName = "admin", Name = "管理者", Role = RoleKubun.Admin, UseFlag = true, CreatedDateTime = now, ModifiedDateTime = now, CreatedName = "seed", ModifiedName = "seed" };
            admin.PasswordHash = hasher.HashPassword(admin, "Admin#12345");

            var general = new User { UserName = "general", Name = "一般ユーザー", Role = RoleKubun.General, UseFlag = true, CreatedDateTime = now, ModifiedDateTime = now, CreatedName = "seed", ModifiedName = "seed" };
            general.PasswordHash = hasher.HashPassword(general, "General#12345");

            db.Users.AddRange(admin, general);
        }

        if (!db.Stores.Any())
        {
            (string Code, string Name, string PostalCode, string Address, string Phone)[] stores =
            [
                ("S001", "サンプル店舗A", "100-0001", "東京都千代田区千代田1-1", "03-0000-0001"),
                ("S002", "サンプル店舗B", "530-0001", "大阪府大阪市北区梅田1-1", "06-0000-0002"),
                ("S003", "テスト商店", "460-0001", "愛知県名古屋市中区栄1-1", "052-000-0003"),
            ];
            for (var i = 0; i < stores.Length; i++)
            {
                var s = stores[i];
                db.Stores.Add(new Store
                {
                    Code = s.Code,
                    Name = s.Name,
                    PostalCode = s.PostalCode,
                    Address = s.Address,
                    PhoneNumber = s.Phone,
                    UseFlag = true,
                    DisplayOrderNumber = i + 1,
                    CreatedDateTime = now,
                    ModifiedDateTime = now,
                    CreatedName = "seed",
                    ModifiedName = "seed",
                });
            }
        }

        if (!db.Suppliers.Any())
        {
            (string Code, string Name, SupplierTypeKubun Kubun, string? CorporateNumber, decimal? CreditLimit, DateTime TransactionStartDate)[] suppliers =
            [
                ("T001", "株式会社サンプル商事", SupplierTypeKubun.Corporate, "1234567890123", 5_000_000m, new DateTime(2024, 4, 1)),
                ("T002", "個人事業主サンプル", SupplierTypeKubun.Individual, null, null, new DateTime(2025, 1, 15)),
                ("T003", "テスト物産株式会社", SupplierTypeKubun.Corporate, "9876543210987", null, new DateTime(2023, 10, 1)),
            ];
            for (var i = 0; i < suppliers.Length; i++)
            {
                var s = suppliers[i];
                db.Suppliers.Add(new Supplier
                {
                    Code = s.Code,
                    Name = s.Name,
                    SupplierTypeKubun = s.Kubun,
                    CorporateNumber = s.CorporateNumber,
                    CreditLimit = s.CreditLimit,
                    TransactionStartDate = s.TransactionStartDate,
                    UseFlag = true,
                    DisplayOrderNumber = i + 1,
                    CreatedDateTime = now,
                    ModifiedDateTime = now,
                    CreatedName = "seed",
                    ModifiedName = "seed",
                });
            }
        }

        if (!db.Customers.Any())
        {
            (string Code, string Name, CustomerRankKubun Kubun, decimal? DiscountRate, DateTime ContractStartDate, DateTime? ContractEndDate)[] customers =
            [
                ("C001", "サンプル商店", CustomerRankKubun.Standard, null, new DateTime(2024, 4, 1), null),
                ("C002", "優良得意先商事", CustomerRankKubun.Premium, 15.00m, new DateTime(2023, 6, 1), new DateTime(2027, 5, 31)),
                ("C003", "期限切れ商店", CustomerRankKubun.New, null, new DateTime(2023, 1, 1), new DateTime(2026, 6, 30)),
            ];
            for (var i = 0; i < customers.Length; i++)
            {
                var c = customers[i];
                db.Customers.Add(new Customer
                {
                    Code = c.Code,
                    Name = c.Name,
                    CustomerRankKubun = c.Kubun,
                    PreferentialDiscountRate = c.DiscountRate,
                    ContractStartDate = c.ContractStartDate,
                    ContractEndDate = c.ContractEndDate,
                    UseFlag = true,
                    DisplayOrderNumber = i + 1,
                    CreatedDateTime = now,
                    ModifiedDateTime = now,
                    CreatedName = "seed",
                    ModifiedName = "seed",
                });
            }
        }

        db.SaveChanges();
    }
}
