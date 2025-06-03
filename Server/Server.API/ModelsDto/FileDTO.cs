namespace Server.API.ModelsDto
{
    public class FileDTO    {
        
        public string Title { get; set; }  // שם הקובץ
        public string FileUrl { get; set; }  // כתובת ה-URL של הקובץ
        public DateTime CreatedAt { get; set; }  // תאריך יצירה
        public DateTime UpdatedAt { get; set; } 
        public string Content { get; set; }
        public int UserId { get; set; }
        public int GroupId { get; set; }
    }
}
