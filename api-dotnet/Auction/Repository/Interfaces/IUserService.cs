namespace Auction.Repository.Interfaces
{
    public interface IUserService
    {
        string CreateJwtToken(int UserID, string Username);

        string GetJwtClaim(string claimName);

        string GetJwtToken();

        string HashPassword(string password);
    }
}
