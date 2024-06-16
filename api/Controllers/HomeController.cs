using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    private readonly ILogger<HomeController> _logger;

    private readonly List<Option> paises = new List<Option>
    {
        new Option("Colombia", "CO"),
        new Option("Venezuela", "VE"),
        new Option("Chile", "CL"),
        new Option("Ecuador", "EC"),
        new Option("Peru", "PE"),
        new Option("Brasil", "BR"),
        new Option("Paraguay", "PY"),
        new Option("Uruguay", "UY"),
        new Option("Bolivia", "BO"),
        new Option("Argentina", "AR")
    };

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

    [HttpGet("search/{text}")]
    public IActionResult GetSearch(string text) {
        return Ok(paises.Where(x => x.Label.Contains(text, StringComparison.OrdinalIgnoreCase)));
    }
}


public record Option (string Label, string Value);