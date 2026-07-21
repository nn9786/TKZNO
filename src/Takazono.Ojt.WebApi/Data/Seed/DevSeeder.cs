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
            var admin = new User { UserName = "admin", Role = RoleKubun.Admin, UseFlag = true, CreatedDateTime = now, ModifiedDateTime = now, CreatedName = "seed", ModifiedName = "seed" };
            admin.PasswordHash = hasher.HashPassword(admin, "Admin#12345");

            var general = new User { UserName = "general", Role = RoleKubun.General, UseFlag = true, CreatedDateTime = now, ModifiedDateTime = now, CreatedName = "seed", ModifiedName = "seed" };
            general.PasswordHash = hasher.HashPassword(general, "General#12345");

            db.Users.AddRange(admin, general);
        }

        if (!db.Units.Any())
        {
            string[][] units = [["EA", "個"], ["BOX", "箱"], ["CS", "ケース"], ["SET", "セット"]];
            for (var i = 0; i < units.Length; i++)
            {
                db.Units.Add(new Unit
                {
                    Code = units[i][0],
                    Name = units[i][1],
                    UseFlag = true,
                    DisplayOrderNumber = i + 1,
                    CreatedDateTime = now,
                    ModifiedDateTime = now,
                    CreatedName = "seed",
                    ModifiedName = "seed",
                });
            }
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

        db.SaveChanges();
    }
}
