using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuralFinder.Models;

namespace MuralFinder.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

  public class BookmarkController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public BookmarkController(DatabaseContext context)
    {
      _context = context;
    }
    [HttpPost("{muralId}")]
    public async Task<ActionResult> BookmarkMuralToUser(int muralId)
    {
      var userId = int.Parse(User.Claims.FirstOrDefault(f => f.Type == "id").Value);
      //check to see if user has already bookmarked mural. 
      var doesBookmarkExist = await _context.Bookmarks.FirstOrDefaultAsync(m => m.MuralId == muralId && m.UserId == userId);
      if (doesBookmarkExist != null)
      {
        // return BadRequest("Bookmark already exists");
        _context.Bookmarks.Remove(doesBookmarkExist);
        await _context.SaveChangesAsync();
        return Ok(doesBookmarkExist);
      }
      else
      {

        var bookmark = new Bookmark
        {
          MuralId = muralId,
          UserId = userId,
        };
        _context.Bookmarks.Add(bookmark);
        await _context.SaveChangesAsync();
        return Ok(bookmark);
      }
    }
  }
}