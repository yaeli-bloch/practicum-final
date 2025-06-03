using Microsoft.AspNetCore.Mvc;
using Server.Core.Models;
using Server.Core.Services;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly IMessageService _service;

    public MessagesController(IMessageService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllMessagesAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var message = await _service.GetMessageByIdAsync(id);
        if (message == null) return NotFound();
        return Ok(message);
    }
    [HttpGet("group/{groupId}")]
    public async Task<IActionResult> GetMessagesByGroup(int groupId)
    {
        var messages = await _service.GetMessagesByGroup(groupId);
        return Ok(messages);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Message message)
    {
        await _service.AddMessageAsync(message);
        return CreatedAtAction(nameof(Get), new { id = message.Id }, message);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Message message)
    {
        if (id != message.Id) return BadRequest();
        await _service.UpdateMessageAsync(message);
        return NoContent();
    } 
   

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMessage(int id, [FromQuery] int userId)
    {
        try
        {
            await _service.DeleteMessage(id, userId);
            return Ok();
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }
}
