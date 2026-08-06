using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Takazono.Ojt.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class RenameUsersTableToMUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "m_users");

            migrationBuilder.RenameIndex(
                name: "IX_users_user_name",
                table: "m_users",
                newName: "IX_m_users_user_name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_m_users",
                table: "m_users",
                column: "sid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_m_users",
                table: "m_users");

            migrationBuilder.RenameTable(
                name: "m_users",
                newName: "users");

            migrationBuilder.RenameIndex(
                name: "IX_m_users_user_name",
                table: "users",
                newName: "IX_users_user_name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "sid");
        }
    }
}
