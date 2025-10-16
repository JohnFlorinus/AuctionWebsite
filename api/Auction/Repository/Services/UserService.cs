using Auction.Repository.Context;
using Auction.Repository.Entities;
using Auction.Repository.Interfaces;
using Dapper;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Auction.Repository.Services
{
    // krypteringsklass - JWT och Hashing
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly DataBaseContext _dataBaseContext;
        private readonly string? _key;
        private readonly string? _issuer;
        private readonly string? _audience;

        public UserService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, DataBaseContext db)
        {
            _configuration = configuration;
            _contextAccessor = httpContextAccessor;
            _key = configuration.GetValue<string>("JWT:Key");
            _issuer = configuration.GetValue<string>("JWT:Issuer");
            _audience = configuration.GetValue<string>("JWT:Audience");
            _dataBaseContext = db;
        }

        public string CreateJwtToken(int UserID, string Username)
        {
            var claims = new List<Claim> {
        new Claim("UserID", UserID.ToString()),
        //new Claim("Username", Username),
    };

            var jwtToken = new JwtSecurityToken(
                claims: claims,
                notBefore: DateTime.UtcNow,
                audience: _audience,
                issuer: _issuer,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(
                       Encoding.UTF8.GetBytes(_key)
                        ),
                    SecurityAlgorithms.HmacSha256Signature)
                );
            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }

        public string GetJwtClaim(string claimName)
        {
            try
            {
                string token = GetJwtToken();
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
                var claimValue = securityToken.Claims.FirstOrDefault(c => c.Type == claimName)?.Value;
                return claimValue;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string GetJwtToken()
        {
            // Retrieve the Authorization header
            var authHeader = _contextAccessor.HttpContext?.Request.Headers["Authorization"].ToString();

            // Check if the Authorization header contains a Bearer token
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                return authHeader.Substring("Bearer ".Length).Trim();
            }

            return null;
        }

        public string HashPassword(string password)
        {
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, Encoding.UTF8.GetBytes("snoopdoggXwizkhalifa"), 10000, HashAlgorithmName.SHA256))
            {
                byte[] hash = pbkdf2.GetBytes(32);
                return Convert.ToBase64String(hash);
            }
        }
    }
}
