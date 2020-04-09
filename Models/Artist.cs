using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MuralFinder.Models
{
  public class Artist
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Website { get; set; }
    public string Facebook { get; set; }
    public string Instagram { get; set; }
    public List<Mural> Murals { get; set; } = new List<Mural>();

    public Mural Mural { get; set; }
  }
}