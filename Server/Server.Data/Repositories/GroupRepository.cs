using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public class GroupRepository :IGroupRepository
    {
        private readonly DataContext _context;

        public GroupRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Group> GetGroupByIdAsync(int id)
        {
            var group = await _context.Groups
                                       .Include(g => g.Files) // טוען את הקבצים הקשורים לקבוצה
                                       .Include(g => g.Users) // טוען את המשתמשים הקשורים לקבוצה
                                        // אם יש צורך להוסיף את המשתמש עצמו (User) מתוך GroupUser
                                       .FirstOrDefaultAsync(g => g.Id == id);

            // Debugging: לוודא שהקבצים והמשתמשים נטענים
            if (group != null)
            {
                Console.WriteLine($"Group: {group.Name}, Files Count: {group.Files.Count}, Users Count: {group.Users.Count}");
            }

            return group;
        }
        public async Task<Group> GetGroupByPasswordAsync(string password)
        {
            return await _context.Groups.FirstOrDefaultAsync(g => g.Password == password); 
        }
        
        public async Task<IEnumerable<Group>> GetAllGroupsAsync()
        {
            return await _context.Groups.ToListAsync();
        }

        public async Task<int> CreateGroupAsync(Group group)
        {
            _context.Groups.Add(group);
            await _context.SaveChangesAsync();
            return group.Id;
        }
        public async Task AddUserForGroupAsync(GroupUser userForGroup, int groupId)
        {
            var group = _context.Groups.FirstOrDefault(g => g.Id == groupId);
            if (group != null)
            {
                group.Users.Add(userForGroup);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Group> UpdateGroupAsync(Group group)
        {
            _context.Groups.Update(group);
            await _context.SaveChangesAsync();
            return group;
        }

        public async Task DeleteGroupAsync(int id)
        {
            var group = await _context.Groups.FindAsync(id);
            if (group != null)
            {
                _context.Groups.Remove(group);
                await _context.SaveChangesAsync();
            }
        }
        public void RemoveUserFromGroup(Group group, Users user)
        {
            var groupUser = group.Users.FirstOrDefault(u => u.UserId == user.Id);
            if (groupUser != null)
            {
                group.Users.Remove(groupUser);
            }
        }

        // שמירה למסד נתונים אחרי השינויים
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
