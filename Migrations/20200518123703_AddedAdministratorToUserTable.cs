using Microsoft.EntityFrameworkCore.Migrations;

namespace MuralFinder.Migrations
{
    public partial class AddedAdministratorToUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isAdministrator",
                table: "Users",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isAdministrator",
                table: "Users");
        }
    }
}
