using Auction.Repository.Entities;

namespace Auction.Repository.Interfaces
{
    public interface IUserRepo
    {
        Task<string> CreateUserAsync(string username, string password);
        Task<string> AuthenticateAsync(string username, string password);
        Task<string> UpdateUserAsync(string username);
    }
}
