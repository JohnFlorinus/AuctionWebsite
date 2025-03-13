namespace Auction.Repository.Entities
{
    public class AuctionEntity
    {
        public int AuctionID { get; set; }
        public string Title { get; set; }
        public int CreatedBy { get; set; }
        public string? Description { get; set; }
        public decimal? HighestBidOrPrice { get; set; }
        public byte[] Image { get; set; }
        public string MIMEType { get; set; }

        // Computed property returns the Base64 string for the frontend
        public string Picture =>
            Image != null && Image.Length > 0
                ? $"{MIMEType},{Convert.ToBase64String(Image)}"
                : null;
    }
}
