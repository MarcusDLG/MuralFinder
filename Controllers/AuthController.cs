using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MuralFinder.Models;
using MuralFinder.ViewModels;

namespace MuralFinder.Controllers
{
  [Route("auth")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private DatabaseContext _context;
    readonly private string JWT_KEY;

    public AuthController(DatabaseContext context, IConfiguration config)
    {
      JWT_KEY = config["JWT-KEY"];
      _context = context;
    }
    private string CreateJWT(User user)
    {
      var expirationTime = DateTime.UtcNow.AddHours(10);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim("id", user.Id.ToString()),
            new Claim("email", user.Email),
            new Claim("name", user.FullName)
      }),
        Expires = expirationTime,
        SigningCredentials = new SigningCredentials(
               new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JWT_KEY)),
              SecurityAlgorithms.HmacSha256Signature
          )
      };
      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));


      return token;
    }

    [HttpPost("signup")]
    public async Task<ActionResult> SignUpUser(NewUser newUser)
    {
      //validate the user data
      if (newUser.Password.Length < 7)
      {
        return BadRequest("Password must be at least 7 characters");
      }
      var user = new User
      {
        Email = newUser.Email,
        FullName = newUser.FullName,
      };
      var hashed = new PasswordHasher<User>().HashPassword(user, newUser.Password);
      user.HashedPassword = hashed;
      // storing the user data
      _context.Users.Add(user);
      await _context.SaveChangesAsync();
      user.HashedPassword = null;
      return Ok(new { Token = CreateJWT(user), user = user });

    }
    [HttpPost("login")]
    public async Task<ActionResult> Login(UserLogin userLogin)
    {

      // find the user
      var user = await _context
        .Users
        .FirstOrDefaultAsync(user => user.Email.ToLower() == userLogin.Email.ToLower());
      if (user == null)
      {
        return BadRequest("User does not exists");
      }
      // validate the password
      var results = new PasswordHasher<User>().VerifyHashedPassword(user, user.HashedPassword, userLogin.Password);

      if (results == PasswordVerificationResult.Success)
      {
        // create the token
        user.HashedPassword = null;
        return Ok(new { Token = CreateJWT(user), user = user });
      }
      else
      {
        return BadRequest("Incorrect password!");
      }

    }

  }
}
