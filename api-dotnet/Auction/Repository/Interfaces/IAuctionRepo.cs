using Auction.Repository.Entities;

namespace Auction.Repository.Interfaces
{
    public interface IAuctionRepo
    {
        public List<AuctionEntity> SearchAuctions(string Title);
        public AuctionEntity GetAuctionByID(int ID);
        public string CreateAuction(AuctionCreateEntity entity);
        public string UpdateAuction(int AuctionID, string description);
        public string DeleteAuction(int AuctionID);

    }
}
