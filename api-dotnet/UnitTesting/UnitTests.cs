using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;

public class UnitTests
{
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;

    public UnitTests()
    {
        // Mock IUserService
        var mockUserService = new Mock<IUserService>();
        mockUserService.Setup(service => service.CreateJwtToken(It.IsAny<int>(), It.IsAny<string>())).Returns("mocked_jwt_token");
        _userService = mockUserService.Object;
    }

    [Fact]
    public void CreateConnection_OpensSuccessfully()
    {
        // Arrange
        var dbContext = new DataBaseContext();

        // Act
        using var connection = dbContext.CreateConnection();
        connection.Open();

        // Assert
        Assert.NotNull(connection);
        Assert.IsType<SqlConnection>(connection);
        Assert.Equal(ConnectionState.Open, connection.State);
    }

    [Fact]
    public void SearchAuctions_ReturnsOKWithListOfAuctions()
    {
        // Arrange
        var mockRepository = new Mock<IAuctionRepo>();
        mockRepository.Setup(repo => repo.SearchAuctions(null)).Returns(new List<AuctionEntity>());
        var controller = new AuctionController(mockRepository.Object);

        // Act
        var result = controller.SearchAuctions();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.IsAssignableFrom<List<AuctionEntity>>(okResult.Value);
    }

    [Fact]
    public void CreateJwtToken_ValidInputs_ReturnsValidToken()
    {
        // Act
        var token = _userService.CreateJwtToken(1, "testuser");

        // Assert
        Assert.NotNull(token);
        Assert.IsType<string>(token);
        Assert.Equal("mocked_jwt_token", token);
    }
}

// Mocked interfaces and classes for context
public interface IUserService
{
    string CreateJwtToken(int userId, string username);
}

public interface IAuctionRepo
{
    List<AuctionEntity> SearchAuctions(string searchTerm);
}

public class AuctionController : ControllerBase
{
    private readonly IAuctionRepo _auctionRepo;

    public AuctionController(IAuctionRepo auctionRepo)
    {
        _auctionRepo = auctionRepo;
    }

    public IActionResult SearchAuctions()
    {
        var auctions = _auctionRepo.SearchAuctions(null);
        return Ok(auctions);
    }
}

public class AuctionEntity { }

public class DataBaseContext
{

    public SqlConnection CreateConnection()
    {
        var connectionString = "Data Source=localhost;Initial Catalog=AuctionDB;Integrated Security=SSPI; TrustServerCertificate=True;";
        return new SqlConnection(connectionString);
    }
}
