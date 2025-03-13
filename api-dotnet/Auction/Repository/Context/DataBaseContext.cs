    using Microsoft.Data.SqlClient;

namespace Auction.Repository.Context
{
    public class DataBaseContext
    {
        private readonly string _connectionString;

        public DataBaseContext(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public System.Data.IDbConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
