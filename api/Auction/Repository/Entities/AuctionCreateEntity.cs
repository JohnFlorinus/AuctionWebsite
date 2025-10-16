namespace Auction.Repository.Entities
{
    public class AuctionCreateEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }          
        public string Image { get; set; }
    }
}
