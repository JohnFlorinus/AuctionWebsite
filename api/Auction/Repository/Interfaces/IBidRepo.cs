using Auction.Repository.Entities;

namespace Auction.Repository.Interfaces
{
    public interface IBidRepo
    {
        List<dynamic> GetAllBids(int auctionId);
        string PlaceBid(BidsEntity bid);        
        bool DeleteBid(int bidId);
    }
}
