using Microsoft.AspNetCore.Mvc;
using Server.Core.Services;
using Server.Core.Models;
using Server.API.ModelsDto;
using Tesseract;
using OpenCvSharp;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IFileService _FileService;

        public FilesController(IFileService FileService)
        {
            _FileService = FileService;
        }       

        [HttpGet]
        public async Task<IActionResult> GetAllFiles()
        {
            var orderFiles = await _FileService.GetAllFilesAsync();
            return Ok(orderFiles);
        } 
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFileById(int id)
        {
            var oFile = await _FileService.GetFileAsync(id);
            if (oFile == null)
                return NotFound();
            return Ok(oFile);
        }

        [HttpPost]
        public async Task<IActionResult> AddFile([FromBody] FileDTO orderFile)
        {
            if (orderFile == null)
                return BadRequest();
            var FileToAdd=new OFile {Title = orderFile.Title,FileUrl=orderFile.FileUrl
            ,CreatedAt=orderFile.CreatedAt,UpdatedAt=orderFile.UpdatedAt,UserId=orderFile.UserId,GroupId=orderFile.GroupId,Content=orderFile.Content};
            await _FileService.AddFileAsync(FileToAdd);
             return   Ok(orderFile);
        }
        [HttpPost("read-text")]
        public async Task<IActionResult> ReadTextFromImage(string imageUrl)
        {
            if (imageUrl == null /*|| image.Length == 0*/)
            {
                return BadRequest("No image provided.");
            }
            string resultText;
            try
            {
                // הורדת התמונה מה-URL
                using (var httpClient = new HttpClient())
                {
                    var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
                    var tempFilePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString() + ".jpg");

                    // שמירת התמונה בשרת
                    await System.IO.File.WriteAllBytesAsync(tempFilePath, imageBytes);

                    // קריאת הטקסט מהתמונה
                    var processedImagePath = PreprocessImage(tempFilePath);
                    resultText = ExtractTextFromImage(processedImagePath);

                    // מחיקת התמונה מהשרת לאחר השימוש
                    System.IO.File.Delete(tempFilePath);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("ocr :  "+ex.Message);
                return StatusCode(500, $"Error processing image: {ex.Message}");

            }
           

            return Ok(resultText);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFile(int id, [FromBody] OFile orderFile)
        {
            if (id != orderFile.Id)
                return BadRequest();
            await _FileService.UpdateFileAsync(orderFile);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            await _FileService.DeleteFileAsync(id);
            return NoContent();
        }
        private string ExtractTextFromImage(string imagePath)
        {
            using (var engine = new TesseractEngine(@"./tessdata", "heb", EngineMode.Default))
            {
                using (var img = Pix.LoadFromFile(imagePath))
                {
                    using (var page = engine.Process(img))
                    {
                        Console.WriteLine(page.GetText);
                        return page.GetText();
                    }
                }
            }
        }
        private string PreprocessImage(string inputPath)
        {
            var outputPath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + "_processed.jpg");

            using (var src = new OpenCvSharp.Mat(inputPath, OpenCvSharp.ImreadModes.Grayscale))
            {
                // שיפור ניגודיות
                OpenCvSharp.Cv2.EqualizeHist(src, src);

                // סינון רעש עם blur
                OpenCvSharp.Cv2.GaussianBlur(src, src, new OpenCvSharp.Size(3, 3), 0);

                // סף בינארי - הופך את התמונה לשחור-לבן
                OpenCvSharp.Cv2.Threshold(src, src, 0, 255, OpenCvSharp.ThresholdTypes.Binary | OpenCvSharp.ThresholdTypes.Otsu);

                // שמירה לקובץ חדש
                OpenCvSharp.Cv2.ImWrite(outputPath, src);
            }

            return outputPath;
        }

    }
}
