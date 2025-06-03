
using Microsoft.AspNetCore.Mvc;
using Server.Core.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly HttpClient client = new HttpClient();
        private readonly IConfiguration _config;
        public ChatController(IConfiguration config)
        { _config = config; }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GptRequest gptRequest)
        {
            var myApiKey = _config["OpenAi"];
            try
            {
                var prompt = new
                {
                    model = "gpt-4o-mini",
                    messages = new[] {
                    new { role = "system", content = gptRequest.Prompt },
                    new { role = "user", content = gptRequest.Question }
                    }
                };
                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
                {
                    Content = JsonContent.Create(prompt)
                };
                request.Headers.Add("Authorization", $"Bearer {myApiKey}");
                // שליחת הבקשה ל-API
                var response = await client.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"לא הצלחנו לנתח את המידע. סטטוס: {response.StatusCode}. תשובה: {responseContent}");
                }

                var responseContent1 = await response.Content.ReadAsStringAsync();
                return Ok(responseContent1); // החזרת התוכן כהצלחה
            }
            catch (HttpRequestException httpEx)
            {
                Console.WriteLine($"שגיאה בחיבור ל-API: {httpEx.Message}");
                return StatusCode(500, "בעיה בחיבור ל-API.");
            }
            catch (System.Text.Json.JsonException jsonEx)
            {
                Console.WriteLine($"שגיאה בקריאת התשובה מ-API: {jsonEx.Message}");
                return StatusCode(500, "שגיאה בקריאת התשובה מ-API.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"שגיאה כללית: {ex.Message}");
                return StatusCode(500, "שגיאה כלשהי במהלך הפעולה.");
            }
        }
    }
}
