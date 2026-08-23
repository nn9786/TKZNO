using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Takazono.Ojt.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddSupplierAndCustomerMasters : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "m_customer",
                columns: table => new
                {
                    sid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    customer_rank_kubun = table.Column<byte>(type: "tinyint", nullable: false),
                    preferential_discount_rate = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    postal_code = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: true),
                    address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    phone_number = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    contract_start_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    contract_end_date = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("PK_m_customer", x => x.sid);
                });

            migrationBuilder.CreateTable(
                name: "m_supplier",
                columns: table => new
                {
                    sid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    supplier_type_kubun = table.Column<byte>(type: "tinyint", nullable: false),
                    corporate_number = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: true),
                    postal_code = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: true),
                    address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    phone_number = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    credit_limit = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    transaction_start_date = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                    table.PrimaryKey("PK_m_supplier", x => x.sid);
                });

            migrationBuilder.CreateIndex(
                name: "IX_m_customer_code",
                table: "m_customer",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_m_supplier_code",
                table: "m_supplier",
                column: "code",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "m_customer");

            migrationBuilder.DropTable(
                name: "m_supplier");
        }
    }
}
