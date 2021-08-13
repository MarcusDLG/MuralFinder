using System;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MuralFinder.Models
{
  public partial class DatabaseContext : DbContext
  {

    public DbSet<Mural> Murals { get; set; }
    public DbSet<Artist> Artists { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Bookmark> Bookmarks { get; set; }



    private string ConvertPostConnectionToConnectionString(string connection)
    {
      var _connection = connection.Replace("postgres://", String.Empty);
      var output = Regex.Split(_connection, ":|@|/");
      return $"server={output[2]};database={output[4]};User Id={output[0]}; password={output[1]}; port={output[3]}; SSL Mode=Prefer;Trust Server Certificate=true;";
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        var envConn = Environment.GetEnvironmentVariable("DATABASE_URL");
        // #error Update this connection string to point to your own database.
        var conn = "server=localhost;database=MuralFinderDatabase";
        if (envConn != null)
        {
          conn = ConvertPostConnectionToConnectionString(envConn);
        }
        optionsBuilder.UseNpgsql(conn);
      }
    }

  }
}
