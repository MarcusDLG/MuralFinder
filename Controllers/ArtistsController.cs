using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuralFinder.Models;

namespace MuralFinder.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ArtistsController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public ArtistsController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Artists
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Artist>>> GetArtists()
    {
      return await _context.Artists.ToListAsync();
    }

    // GET: api/Artists/5
    [HttpGet("{id}")]
    public async Task<ActionResult> GetArtist(int id)
    {
      var artist = await _context.Artists.Include(m => m.Murals)
      .Select(s => new
      {
        Id = s.Id,
        Name = s.Name,
        Website = s.Website,
        Facebook = s.Facebook,
        Instagram = s.Instagram,
        Murals = s.Murals.Select(n => new
        {
          Id = n.Id,
          Name = n.Name,
          ImageUrl = n.ImageUrl,
          Latitude = n.Latitude,
          Longitude = n.Longitude,
        }
        )
      }).FirstOrDefaultAsync(a => a.Id == id);

      if (artist == null)
      {
        return NotFound();
      }

      return Ok(artist);
    }

    // PUT: api/Artists/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutArtist(int id, Artist artist)
    {
      if (id != artist.Id)
      {
        return BadRequest();
      }

      _context.Entry(artist).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ArtistExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Artists
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPost]
    public async Task<ActionResult<Artist>> PostArtist(Artist artist)
    {
      _context.Artists.Add(artist);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetArtist", new { id = artist.Id }, artist);
    }

    [HttpPost("{artistId}/murals")]
    public async Task<ActionResult<Artist>> PostMuralToArtist(int artistId, Mural mural)
    {
      mural.ArtistId = artistId;
      _context.Murals.Add(mural);
      await _context.SaveChangesAsync();

      return Ok(mural);
    }

    // DELETE: api/Artists/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Artist>> DeleteArtist(int id)
    {
      var artist = await _context.Artists.FindAsync(id);
      if (artist == null)
      {
        return NotFound();
      }

      _context.Artists.Remove(artist);
      await _context.SaveChangesAsync();

      return artist;
    }

    private bool ArtistExists(int id)
    {
      return _context.Artists.Any(e => e.Id == id);
    }
  }
}
