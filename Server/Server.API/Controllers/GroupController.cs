using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.API.ModelsDto;
using Server.Core.Models;
using Server.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;
        private readonly IUserService _userService;
        //private readonly IGroupUserService _groupUserService;
        public GroupController(IGroupService groupService,IUserService userService)
        {
            _groupService = groupService;
            _userService = userService;
            //_groupUserService = groupUserService;
        }

        [HttpGet("{id}", Name = "GetGroupById")]
        public async Task<ActionResult<Group>> GetGroupByIdAsync(int id)
        {
            var group = await _groupService.GetGroupByIdAsync(id);
            if (group == null)
            {
                return NotFound();
            }
            
            return Ok(group);
        }
        [HttpGet("password/{password}")]
        public async Task<ActionResult<Group>> GetGroupByPasswordAsync(string password)
        {
            var group = await _groupService.GetGroupByPasswordAsync(password);
            if (group == null)
            {

                return NotFound();
            }
            return Ok(group);
        }
        [HttpGet("{id}/files")]
        public async Task<ActionResult<IEnumerable<OFile>>> GetGroupFilesAsync(int id)
        {
            var group = await _groupService.GetGroupByIdAsync(id);
            if (group == null)
            {
                return NotFound();
            }      
            return Ok(group.Files);
        }




        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> GetAllGroupsAsync()
        {
            var groups = await _groupService.GetAllGroupsAsync();
            return Ok(groups);
        }

        [HttpPost]
        public async Task<int> CreateGroupAsync([FromBody] GroupDTO group)
        {
            if (group == null)
            {
                //return BadRequest("Group cannot be null");
            }
            try
            {                
                var userId = User.FindFirst("id")?.Value;
                await Console.Out.WriteLineAsync(userId+"userId: ");
                var groupToAdd = new Group
                {
                    Name = group.Name,
                    Password = group.Password,
                    AdminPassword = group.AdminPassword,
                    AdminId = int.Parse(userId),
                    Files = new List<OFile>(),
                    Users = new List<GroupUser>()
                };
                await Console.Out.WriteLineAsync("group to add"+groupToAdd.AdminId);
               int id= await _groupService.CreateGroupAsync(groupToAdd);
                return id;              
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync("errorjjjjjjjjjjjjjjjj");
                return -1;
             }            
        }
        [HttpPost("{groupId}/users/{userId}")]
        public async Task<IActionResult> AddUserToGroup(int groupId, int userId)
        {
            try
            {
                await _groupService.AddUserToGroupAsync(groupId, userId);
                return Ok("User added to group successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Group>> UpdateGroupAsync(int id, [FromBody] Group group)
        {
            if (id != group.Id)
            {
                return BadRequest();
            }

            var updatedGroup = await _groupService.UpdateGroupAsync(group);
            return Ok(updatedGroup);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGroupAsync(int id)
        {
            await _groupService.DeleteGroupAsync(id);
            return NoContent();
        }
        [HttpDelete("{groupId}/users/{mail}")]
        public async Task<IActionResult> RemoveUserFromGroup(int groupId, string mail)
        {
            try
            {
                await _groupService.RemoveUserFromGroupAsync(groupId, mail); // שולחים לשירות
                return NoContent(); // החזר NoContent (204) אחרי מחיקה
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message }); // אם יש בעיה, מחזירים הודעת שגיאה
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            if (login == null || string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
            {
                return BadRequest("Email or password is missing.");
            }            
            try
            {
                // קריאה לפונקציה ב-Service כדי לבצע את הלוגין
                var token = await _groupService.LoginAsync(login);

                // החזרת ה-token כתגובה
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                // במקרה של שגיאה, נחזיר תשובה עם הודעת שגיאה
                return Unauthorized(new { Message = ex.Message });
            }
        }
    }
}
