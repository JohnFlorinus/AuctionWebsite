using Auction.Repository.Context;
using Auction.Repository.Entities;
using Auction.Repository.Interfaces;
using Dapper;
using Microsoft.Identity.Client;
using System.Data;
using System.Runtime.CompilerServices;
using static Dapper.SqlMapper;

namespace Auction.Repository.Repos
{
    public class AuctionRepo : IAuctionRepo
    {
        private readonly DataBaseContext _context;
        private readonly IUserService _userService;

        public AuctionRepo(DataBaseContext databaseContext, IUserService userService)
        {
            _context = databaseContext;
            _userService = userService;
        }

        public List<AuctionEntity> SearchAuctions(string Title)
        {
            using (IDbConnection db = _context.CreateConnection())
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Title", Title);
                return db.Query<AuctionEntity>("SearchAuctions",
                    parameters,
                    commandType: CommandType.StoredProcedure)
                    .ToList();
            }
        }

        public AuctionEntity GetAuctionByID(int ID)
        {
            using (IDbConnection db = _context.CreateConnection())
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ID", ID);
                return db.QuerySingle<AuctionEntity>("GetAuctionByID",
                    parameters,
                    commandType: CommandType.StoredProcedure);
            }
        }

        public string CreateAuction(AuctionCreateEntity entity)
        {
            using (IDbConnection db = _context.CreateConnection())
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Title", entity.Title);
                parameters.Add("@Description", entity.Description);
                parameters.Add("@Price", entity.Price);
                parameters.Add("@CreatedBy", _userService.GetJwtClaim("UserID"));
                // base 64 -> bytes för binary storage
                byte[] imageBytes = null;
                string base64Data = entity.Image.Split(',')[1];
                string mimetype = entity.Image.Split(',')[0]; 
                imageBytes = Convert.FromBase64String(base64Data);

                parameters.Add("@Picture", imageBytes, DbType.Binary);
                parameters.Add("@MIMEType", mimetype);

                string feedback = db.QuerySingle<string>("CreateAuction",
                    parameters,
                    commandType: CommandType.StoredProcedure);
                if (feedback == "Auktionen har skapats")
                {
                    return feedback;
                }
                else
                {
                    throw new Exception(feedback);
                }
            }
        }

        public string UpdateAuction(int AuctionID, string description)
        {
            using (IDbConnection db = _context.CreateConnection())
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Description", description);
                parameters.Add("@UserID", _userService.GetJwtClaim("UserID"));
               parameters.Add("@AuctionID", AuctionID);
               string feedback = db.QuerySingle<string>("UpdateAuction",
                    parameters,
                    commandType: CommandType.StoredProcedure);

                if (feedback == "Auktion beskrivning har uppdaterats")
                {
                    return feedback;
                }
                else
                {
                    throw new Exception(feedback);
                }
            }
        }

        public string DeleteAuction(int AuctionID)
        {
            using (IDbConnection db = _context.CreateConnection())
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@AuctionID", AuctionID);
                parameters.Add("@UserID", _userService.GetJwtClaim("UserID"));
                
                string feedback = db.QuerySingle<string>("DeleteAuction",
                    parameters,
                    commandType: CommandType.StoredProcedure);

                if (feedback == "Auktionen har blivit raderad")
                {
                    return feedback;
                }
                else
                {
                    throw new Exception(feedback);
                }
            }
        }
    }
}
