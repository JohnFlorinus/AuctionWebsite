using Auction.Repository.Context;
using Auction.Repository.Entities;
using Auction.Repository.Interfaces;
using Auction.Repository.Services;
using Dapper;
using Microsoft.Extensions.Logging;
using System.Data;

namespace Auction.Repository.Repos
{
    public class BidRepo : IBidRepo
    {
        private readonly DataBaseContext _context;
        private readonly ILogger<BidRepo> _logger;
        private readonly IUserService userService;

        public BidRepo(DataBaseContext databaseContext, IUserService UserService, ILogger<BidRepo> logger)
        {
            _context = databaseContext;
            _logger = logger;
            userService = UserService;
        }

        public string PlaceBid(BidsEntity bid)
        {
                using (IDbConnection db = _context.CreateConnection())
                {
                    var parameters = new
                    {
                        AuctionID = bid.AuctionID,
                        UserID = userService.GetJwtClaim("UserID"),
                        BidAmount = bid.BidAmount
                    };

                    // Execute the stored procedure
                    string result = db.Query<string>("PlaceBid", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    // Log the result for debugging
                    if (result == "Budet har lagts")
                    {
                        return result;
                    }
                    else
                    {
                        throw new Exception(result);
                    }
                }
        }



        public List<dynamic> GetAllBids(int auctionId)
        {
            try
            {
                using (IDbConnection db = _context.CreateConnection())
                {
                    var parameters = new { AuctionID = auctionId };
                    var result = db.Query<dynamic>("GetAllBids", parameters, commandType: CommandType.StoredProcedure).ToList();
                    return result;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching bids for AuctionID {auctionId}: {ex.Message}");
                return new List<dynamic>();
            }
        }

        public bool DeleteBid(int bidId)
        {
            try
            {
                using (IDbConnection db = _context.CreateConnection())
                {
                    var parameters = new
                    {
                        BidID = bidId,
                        UserID = userService.GetJwtClaim("UserID")
                    };

                    var result = db.Query<string>("DeleteBid", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        
                    if (result == "Bid has been deleted")
                    {
                        return true;
                    }

                    _logger.LogInformation($"DeleteBid result: {result}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting bid {bidId}: {ex.Message}");
                return false;
            }
        }
    }
}
