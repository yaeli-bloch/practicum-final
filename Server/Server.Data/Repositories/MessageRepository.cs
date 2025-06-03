using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Core.Repositories;

namespace Server.Data.Repositories
{
    public class MessageRepository:IMessageRepository
    {
        private readonly DataContext _context;

        public MessageRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Message>> GetAllAsync() => await _context.Messages.ToListAsync();

        public async Task<Message> GetByIdAsync(int id) => await _context.Messages.FindAsync(id);
        public async Task<IEnumerable<Message>> GetMessagesByGroup(int groupId)
        {
            return await _context.Messages
                .Where(m => m.GroupId == groupId)
                .OrderBy(m => m.Date)
                .ToListAsync();
        }

        public async Task AddAsync(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Message message)
        {
            _context.Messages.Update(message);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message != null)
            {
                _context.Messages.Remove(message);
                await _context.SaveChangesAsync();
            }
        }
    }
}
