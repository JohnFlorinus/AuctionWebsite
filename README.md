
# Auction Website

A full-stack auction website built from scratch. React is used for the frontend and communicates with a .NET API integrated with a relational MSSQL database.

## Short Technical Details

### Security
- JWT is used for user authentication
- Hashing+salting is applied to all passwords
### Database ( SQL Server )
- Three tables  - Auctions, Bids, Users
- Stored Procedures for all actions
### .NET API 
- Dapper is used as micro-ORM
- Repository-esque pattern
- Unit testing included
- CORS & Swagger
### React Website
- Based on React Router and Context API
- Standalone CSS
- Clean Separation of Concerns

## Stuff to Implement
- Implement rate-limits and email verification on signup for scalability
- When JWT tokens expire, redirect and inform user properly
- Link with legitimate payment methods for tracking user balances
- Make the API 