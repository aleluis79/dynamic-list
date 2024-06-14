using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [HttpGet("ping")]
    public IActionResult Get()
    {
        return Ok("pong");
    }

    [HttpGet("form")]
    public IActionResult GetForm() {
        using StreamReader reader = new("Forms/oficio_alias.json");
        var json = reader.ReadToEnd();
        return Ok(json);
    }
}
