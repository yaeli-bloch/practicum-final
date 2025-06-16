using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/upload")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName; 

        public UploadController(IAmazonS3 s3Client,IConfiguration configuration)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:S3BucketName"]; 
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName, [FromQuery] string fileType)
        {
            string contentType = fileType.ToLower() switch
            {
                "application/pdf" => "application/pdf",
                "pdf" => "application/pdf",
                "image/jpeg" => "image/jpeg",
                "jpeg" => "image/jpeg",
                "jpg" => "image/jpeg",
                "image/png" => "image/png", // הוספת תמיכה לקובצי PNG
                "png" => "image/png",       // הוספת תמיכה לקובצי PNG
                "application/msword" => "application/msword", // הוספת תמיכה לקובצי Word
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // עבור קובצי Word ב-Office 2007 ואילך
                "doc" => "application/msword", // הוספת תמיכה לקובצי Word
                "docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // הוספת תמיכה לקובצי Word
                _ => "application/octet-stream" // ברירת מחדל לסוגים שאינם מזוהים
            };

            Console.WriteLine(contentType, " content type");
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName, 
                Key = fileName,   
                Verb = HttpVerb.PUT,             
                Expires = DateTime.UtcNow.AddMinutes(5),  // הקישור יפוג אחרי 5 דקות
                ContentType = contentType
            };

            string url = _s3Client.GetPreSignedURL(request); // קבלת ה-URL
            return Ok(new { url ,contentType}); // מחזירים את ה-URL
        }
        [HttpGet("download-url")]
        public async Task<string> GetDownloadUrlAsync(string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(30) 
            };

            return _s3Client.GetPreSignedURL(request);
        }
    }
}
