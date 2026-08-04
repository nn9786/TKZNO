using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Takazono.Ojt.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedUnitMasterData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "m_unit",
                columns: new[] { "sid", "code", "created_date_time", "created_name", "created_sid", "display_order_number", "modified_date_time", "modified_name", "modified_sid", "name", "un_delete_flag", "use_flag" },
                values: new object[,]
                {
                    { 1L, "EA", new DateTime(2026, 7, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "seed", null, 1, new DateTime(2026, 7, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "seed", null, "個", true, true },
                    { 2L, "BOX", new DateTime(2026, 7, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "seed", null, 2, new DateTime(2026, 7, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "seed", null, "箱", false, true },
                    { 3L, "CS", new DateTime(2026, 7, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "seed", null, 3, new DateTime(2026, 7, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "seed", null, "ケース", false, true },
                    { 4L, "SET", new DateTime(2026, 7, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "seed", null, 4, new DateTime(2026, 7, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "seed", null, "セット", false, true }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "m_unit",
                keyColumn: "sid",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "m_unit",
                keyColumn: "sid",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "m_unit",
                keyColumn: "sid",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "m_unit",
                keyColumn: "sid",
                keyValue: 4L);
        }
    }
}
