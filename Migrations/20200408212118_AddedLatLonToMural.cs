using Microsoft.EntityFrameworkCore.Migrations;

namespace MuralFinder.Migrations
{
    public partial class AddedLatLonToMural : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Murals",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Murals",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Murals");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Murals");
        }
    }
}
