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
  public class MuralsController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public MuralsController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Murals
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Mural>>> GetMurals()
    {
      return await _context.Murals.ToListAsync();
    }

    // GET: api/Murals/5
    [HttpGet("{id}")]
    public async Task<ActionResult> GetMural(int id)
    {
      // var userId = int.Parse(User.Claims.FirstOrDefault(f => f.Type == "id").Value);
      // // if (userId == null){
      // //   return BadRequest();
      // // }
      // var doesBookmarkExist = await _context.Bookmarks.FirstOrDefaultAsync(m => m.MuralId == id && m.UserId == userId);
      // if (doesBookmarkExist){
      //   ;
      // }
      var mural = await _context.Murals
      .Include(i => i.Artist)
      .Select(s => new
      {
        Id = s.Id,
        Name = s.Name,
        ImageUrl = s.ImageUrl,
        Description = s.Description,
        City = s.City,
        State = s.State,
        Address = s.Address,
        Latitude = s.Latitude,
        Longitude = s.Longitude,
        Artist = new
        {
          Id = s.Artist.Id,
          Name = s.Artist.Name,
          // Website = s.Artist.Website,
          // Facebook = s.Artist.Facebook,
          // Instagram = s.Artist.Instagram
        }
      })
      .FirstOrDefaultAsync(f => f.Id == id)
      ;

      if (mural == null)
      {
        return NotFound();
      }

      return Ok(mural);
    }

    // PUT: api/Murals/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMural(int id, Mural mural)
    {
      if (id != mural.Id)
      {
        return BadRequest();
      }

      _context.Entry(mural).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!MuralExists(id))
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

    // POST: api/Murals
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPost]
    public async Task<ActionResult<Mural>> PostMural(Mural mural)
    {
      _context.Murals.Add(mural);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetMural", new { id = mural.Id }, mural);
    }

    // DELETE: api/Murals/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Mural>> DeleteMural(int id)
    {
      var mural = await _context.Murals.FindAsync(id);
      if (mural == null)
      {
        return NotFound();
      }

      _context.Murals.Remove(mural);
      await _context.SaveChangesAsync();

      return mural;
    }

    private bool MuralExists(int id)
    {
      return _context.Murals.Any(e => e.Id == id);
    }
  }
}
