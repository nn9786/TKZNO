using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Takazono.Ojt.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddUnitUnDeleteFlag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "un_delete_flag",
                table: "m_unit",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "un_delete_flag",
                table: "m_unit");
        }
    }
}
