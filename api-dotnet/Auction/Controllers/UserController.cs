using Microsoft.AspNetCore.Mvc;
using Auction.Repository.Entities;
using Auction.Repository.Services;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Azure.Identity;
using Auction.Repository.Interfaces;

namespace Auction.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepo _repo;

        public UsersController(IUserRepo userRepo)
        {
            _repo = userRepo;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(string username, string password)
        {
            try
            {
                string output = await _repo.CreateUserAsync(username, password);
                return Ok(output);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string username, string password)
        {
            try
            {
                string token = await _repo.AuthenticateAsync(username, password);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateUser(string username)
        {
            string updated = await _repo.UpdateUserAsync(username);
            return Ok(updated);
        }
    }
}