using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;

namespace Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<OFile> Files { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet <Message> Messages { get; set; }
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OFile>()
           .HasOne(o => o.Group)        // קשר בין קובץ לקבוצה
           .WithMany(g => g.Files)      // קבוצה יכולה להכיל הרבה קבצים
           .HasForeignKey(o => o.GroupId);

        }
    }
}
