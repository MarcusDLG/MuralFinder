using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
// using FileExample.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MuralFinder.Controllers
{
  [Route("file")]
  [ApiController]
  public class FileUploadController : ControllerBase
  {
    [HttpPost("upload")]
    public ActionResult UploadFile(IFormFile file)
    {
      // validate its an image 
      var extension = file.FileName.Split('.').Last();
      var contentType = file.ContentType;
      if (extension == "jpeg" || extension == "jpg" || extension == "png")
      {
        // the file is valid
        // upload the file to cloudiary 
        var cloudiary = new Cloudinary(new Account("marcusdlg", "897159981669222", "XmP5kvH6cdKVVWGEExYc2YHt6Mw"));
        var uploadParams = new ImageUploadParams()
        {
          File = new FileDescription(file.FileName, file.OpenReadStream())
        };
        var result = cloudiary.Upload(uploadParams);
        return Ok(result);
      }
      else
      {
        // the file is not valid 
        return BadRequest("Not Valid Image");
      }
    }
  }
}