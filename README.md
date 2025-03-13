
# Auction Website

A full-stack auction website built from scratch. React is used for the frontend and communicates with a .NET API integrated with a relational MSSQL database.

## Short Technical Details

### Security
- JWT is used for user authentication
- Hashing+salting is applied to all passwords
### Database ( SQL Server )
- Three tables  - Auctions, Bids, Users
- Stored Procedures for all actions, no dynamic queries are used
### .NET API 
- Dapper is used as micro-ORM
- Repository-esque pattern
- Unit testing included
### React Website
- Based on React Router and Context API
- Standalone CSS
- Clean Separation of Concerns

