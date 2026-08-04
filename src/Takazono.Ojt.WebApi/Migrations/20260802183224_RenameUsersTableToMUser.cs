using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Takazono.Ojt.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class RenameUsersTableToMUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "m_user");

            migrationBuilder.RenameIndex(
                name: "IX_users_user_name",
                table: "m_user",
                newName: "IX_m_user_user_name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_m_user",
                table: "m_user",
                column: "sid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_m_user",
                table: "m_user");

            migrationBuilder.RenameTable(
                name: "m_user",
                newName: "users");

            migrationBuilder.RenameIndex(
                name: "IX_m_user_user_name",
                table: "users",
                newName: "IX_users_user_name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "sid");
        }
    }
}
