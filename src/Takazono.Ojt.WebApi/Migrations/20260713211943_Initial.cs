using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TakazonoOjt.Api.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "m_store",
                columns: table => new
                {
                    sid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    postal_code = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: true),
                    address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    phone_number = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    use_flag = table.Column<bool>(type: "bit", nullable: false),
                    display_order_number = table.Column<int>(type: "int", nullable: false),
                    version = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false),
                    created_date_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_sid = table.Column<long>(type: "bigint", nullable: true),
                    created_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    modified_date_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modified_sid = table.Column<long>(type: "bigint", nullable: true),
                    modified_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_m_store", x => x.sid);
                });

            migrationBuilder.CreateTable(
                name: "m_unit",
                columns: table => new
                {
                    sid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    use_flag = table.Column<bool>(type: "bit", nullable: false),
                    display_order_number = table.Column<int>(type: "int", nullable: false),
                    version = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false),
                    created_date_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_sid = table.Column<long>(type: "bigint", nullable: true),
                    created_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    modified_date_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modified_sid = table.Column<long>(type: "bigint", nullable: true),
                    modified_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_m_unit", x => x.sid);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    sid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    password_hash = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    role = table.Column<byte>(type: "tinyint", nullable: false),
                    use_flag = table.Column<bool>(type: "bit", nullable: false),
                    version = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false),
                    created_date_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_sid = table.Column<long>(type: "bigint", nullable: true),
                    created_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    modified_date_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modified_sid = table.Column<long>(type: "bigint", nullable: true),
                    modified_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.sid);
                });

            migrationBuilder.CreateIndex(
                name: "IX_m_store_code",
                table: "m_store",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_m_unit_code",
                table: "m_unit",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_users_user_name",
                table: "users",
                column: "user_name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "m_store");

            migrationBuilder.DropTable(
                name: "m_unit");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
