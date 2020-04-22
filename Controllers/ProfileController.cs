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
  public class ProfileController : ControllerBase
  {
    readonly private DatabaseContext _context;
    public ProfileController(DatabaseContext context)
    {
      _context = context;
    }
    [HttpGet]
    public async Task<ActionResult> GetCurrentUser()
    {
      var userId = int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "id").Value);
      var user = await _context.Users.Include(i => i.Bookmarks).ThenInclude(i => i.Mural).FirstOrDefaultAsync(f => f.Id == userId);
      return Ok(user);
    }
  }
}