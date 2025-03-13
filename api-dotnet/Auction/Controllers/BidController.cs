using Auction.Repository.Entities;
using Auction.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Auction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly IBidRepo _bidRepo;

        public BidController(IBidRepo bidRepo)
        {
            _bidRepo = bidRepo;
        }

        [Authorize]
        [HttpPost("PlaceBid")]
        public IActionResult PlaceBid([FromBody] BidsEntity bid)
        {
            try
            {
                string success = _bidRepo.PlaceBid(bid);
                return Ok(success);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllBids/{auctionId}")]
        public IActionResult GetAllBids(int auctionId)
        {
            var result = _bidRepo.GetAllBids(auctionId);

            if (result == null || !result.Any())
            {
                return NotFound($"No data found for AuctionID: {auctionId}");
            }

            return Ok(result);
        }


        [Authorize]
        [HttpDelete("DeleteBid/{bidId}")]
        public IActionResult DeleteBid(int bidId)
        {
            var success = _bidRepo.DeleteBid(bidId);
            if (!success)
            {
                return BadRequest("Failed to delete bid.");
            }
            return Ok("Bid deleted successfully.");
        }
    }
}
