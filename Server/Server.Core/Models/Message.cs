using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int GroupId { get;set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
    }
}
