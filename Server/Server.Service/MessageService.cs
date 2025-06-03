using Server.Core.Models;
using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service
{
    public class MessageService:IMessageService
    {
        private readonly IMessageRepository _repository;

        public MessageService(IMessageRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Message>> GetAllMessagesAsync() => _repository.GetAllAsync();

        public Task<Message> GetMessageByIdAsync(int id) => _repository.GetByIdAsync(id);

        public Task AddMessageAsync(Message message) => _repository.AddAsync(message);

        public Task UpdateMessageAsync(Message message) => _repository.UpdateAsync(message);

        public Task DeleteMessageAsync(int id) => _repository.DeleteAsync(id);
        public async Task<IEnumerable<Message>> GetMessagesByGroup(int groupId)
        {
            Console.WriteLine("jjjjjj");
            return await _repository.GetMessagesByGroup(groupId);
        }

        public async Task DeleteMessage(int id, int userId)
        {
            var message = await _repository.GetByIdAsync(id);
            Console.WriteLine(message.UserId);
            Console.WriteLine($"{userId} deleted");
            if (message == null || message.UserId != userId)
                throw new UnauthorizedAccessException("אתה רשאי למחוק רק הודעות שלך.");
            await _repository.DeleteAsync(message.Id);
        }

    }
}
