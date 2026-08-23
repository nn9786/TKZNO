using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Takazono.Ojt.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class RenameMUsersToMUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_m_users",
                table: "m_users");

            migrationBuilder.RenameTable(
                name: "m_users",
                newName: "m_user");

            migrationBuilder.RenameIndex(
                name: "IX_m_users_user_name",
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
                newName: "m_users");

            migrationBuilder.RenameIndex(
                name: "IX_m_user_user_name",
                table: "m_users",
                newName: "IX_m_users_user_name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_m_users",
                table: "m_users",
                column: "sid");
        }
    }
}
