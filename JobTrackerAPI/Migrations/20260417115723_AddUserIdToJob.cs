using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToJob : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Jobs");
        }
    }
}
