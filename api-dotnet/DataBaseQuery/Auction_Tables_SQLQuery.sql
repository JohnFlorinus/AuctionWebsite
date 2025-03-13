-- 1. Users Table
CREATE TABLE Users
(
UserID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,-- Auto-incrementing ID
Username NVARCHAR(50) NOT NULL UNIQUE, -- Unique username
    Password NVARCHAR(255) NOT NULL, -- Hashed password
    Email NVARCHAR(255), -- Optional email
    CreatedAt DATETIME DEFAULT GETDATE(), -- Timestamp for creation
    UpdatedAt DATETIME DEFAULT GETDATE() -- Timestamp for updates
);

-- 2. Auctions Table
CREATE TABLE Auctions
(
AuctionID INT PRIMARY KEY IDENTITY(1,1), -- Auto-incrementing ID
    Title NVARCHAR(100) NOT NULL, -- Auction title
    Description NVARCHAR(MAX), -- Auction description
    Price DECIMAL(10, 2) NOT NULL, -- Starting price
    StartDate DATETIME NOT NULL, -- Start date
    EndDate DATETIME NOT NULL, -- End date
    CreatedBy INT NOT NULL, -- Foreign key to Users
    IsOpen AS (CASE WHEN EndDate > GETDATE() THEN 1 ELSE 0 END), -- Calculated column
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID) -- Foreign key constraint
);

-- 3. Bids Table
CREATE TABLE Bids 
(
    BidID INT PRIMARY KEY IDENTITY(1,1), -- Auto-incrementing ID
    AuctionID INT NOT NULL, -- Foreign key to Auctions
    UserID INT NOT NULL, -- Foreign key to Users
    BidAmount DECIMAL(10, 2) NOT NULL, -- Bid amount
    BidTime DATETIME DEFAULT GETDATE(), -- Timestamp for bid
    FOREIGN KEY (AuctionID) REFERENCES Auctions(AuctionID), -- Foreign key constraint
    FOREIGN KEY (UserID) REFERENCES Users(UserID) -- Foreign key constraint
);