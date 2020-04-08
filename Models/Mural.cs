using System;
using System.Collections.Generic;

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
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Artist { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.Now;
    // public List<Artist> Artists { get; set; } = new List<Artist>();


  }
}