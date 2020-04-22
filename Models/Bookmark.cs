using System.Text.Json.Serialization;

namespace MuralFinder.Models
{
  public class Bookmark
  {
    public int Id { get; set; }

    public int MuralId { get; set; }
    public Mural Mural { get; set; }
    public int UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; }
  }
}