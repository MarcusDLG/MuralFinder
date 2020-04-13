using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MuralFinder.Models
{
  public class Mural
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Address { get; set; }
    public string Latitude { get; set; }
    public string Longitude { get; set; }
    public string ImageUrl { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.Now;
    public int ArtistId { get; set; }
    [JsonIgnore]
    public Artist Artist { get; set; }



  }
}