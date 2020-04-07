using Microsoft.EntityFrameworkCore.Migrations;

namespace MuralFinder.Migrations
{
    public partial class FixedMuralArtistIssue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Artist",
                table: "Murals",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Artist",
                table: "Murals");
        }
    }
}
