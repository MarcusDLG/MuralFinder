using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MuralFinder.Models
{
  public class User
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public string FullName { get; set; }
    public bool isAdministrator { get; set; } = false;
    [JsonIgnore]
    public string HashedPassword { get; set; }
    public List<Bookmark> Bookmarks { get; set; } = new List<Bookmark>();
  }
}