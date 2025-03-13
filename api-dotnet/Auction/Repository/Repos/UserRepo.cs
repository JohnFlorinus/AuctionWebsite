using System.Data;
using Auction.Repository.Context;
using Auction.Repository.Entities;
using Auction.Repository.Interfaces;
using Auction.Repository.Services;
using Dapper;
using BCrypt.Net;

namespace Auction.Repository.Repos
{
    public class UserRepo : IUserRepo
    {

        private readonly DataBaseContext _dbContext;
        private readonly IUserService _userService;

        public UserRepo(DataBaseContext dbcontext, IUserService userService)
        {
            _dbContext = dbcontext;
            _userService = userService;
        }


        public async Task<string> CreateUserAsync(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                throw new Exception("Användarnamn och lösenord krävs");
            }
            using (IDbConnection conn = _dbContext.CreateConnection())
            {
                conn.Open();
                var parameters = new DynamicParameters();
                parameters.Add("Username", username);
                parameters.Add("Password", _userService.HashPassword(password));
                string output = await conn.QuerySingleOrDefaultAsync<string>("RegisterUser", parameters, commandType: CommandType.StoredProcedure);
                if (output == "Användarnamnet finns redan")
                {
                    throw new Exception(output);
                }
                else
                {
                    return output;
                }
            }
        }

        public async Task<string> AuthenticateAsync(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                throw new Exception("Användarnamn och lösenord krävs");
            }
            using (IDbConnection conn = _dbContext.CreateConnection())
            {
                conn.Open();
                var parameters = new DynamicParameters();
                parameters.Add("Username", username);
                parameters.Add("Password", _userService.HashPassword(password));
                int accountID = await conn.QuerySingleOrDefaultAsync<int>("LoginUser", parameters, commandType: CommandType.StoredProcedure);
                if (accountID != 0)
                {
                    return _userService.CreateJwtToken(accountID, username);
                }
                else
                {
                    throw new Exception("Ogiltigt användarnamn eller lösenord");
                }
            }
        }

        public async Task<string> UpdateUserAsync(string username)
        {
            using (IDbConnection conn = _dbContext.CreateConnection())
            {
                conn.Open();
                var parameters = new DynamicParameters();
                parameters.Add("UserID", _userService.GetJwtClaim("UserID"));
                parameters.Add("NewUsername", username);
                string output = await conn.QuerySingleOrDefaultAsync<string>("UpdateUser", parameters, commandType: CommandType.StoredProcedure);
                return output;
            }
        }


    }
}
