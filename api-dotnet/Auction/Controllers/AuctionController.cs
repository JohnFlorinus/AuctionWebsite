using Auction.Repository.Entities;
using Auction.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Auction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionRepo _auctionRepo;

        public AuctionController(IAuctionRepo _repo)
        {
            _auctionRepo = _repo;
        }

        // GET api/<AuctionController>/5
        [HttpGet("SearchAuctions")]
        public IActionResult SearchAuctions(string Title=null)
        {
            try
            {
                List<AuctionEntity> AuctionResult = _auctionRepo.SearchAuctions(Title);
                return Ok(AuctionResult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAuctionByID")]
        public IActionResult GetAuctionByID(int ID)
        {
            try
            {
                AuctionEntity AuctionResult = _auctionRepo.GetAuctionByID(ID);
                return Ok(AuctionResult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<AuctionController>
        [Authorize]
        [HttpPost("create")]
        public IActionResult CreateAuction(AuctionCreateEntity auctionRequest)
        {
            try
            {
                string output = _auctionRepo.CreateAuction(auctionRequest);
                return Ok(output);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<AuctionController>/5
        [Authorize]
        [HttpPut]
        public IActionResult UpdateAuction(int AuctionID, string description)
        {
            try
            {
                string output = _auctionRepo.UpdateAuction(AuctionID,description);
                return Ok(output);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete]
        public IActionResult DeleteAuction(int AuctionID)
        {
            try
            {
                string output = _auctionRepo.DeleteAuction(AuctionID);
                return Ok(output);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
