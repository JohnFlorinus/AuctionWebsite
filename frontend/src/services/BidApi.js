import { getJwt } from './../utils/JwtHandler';

const BaseUrl = "https://localhost:7281/api";

  export const BidGetAll = async (AuctionID) => {
    try {
      const response = await fetch(`${BaseUrl}/Bid/GetAllBids?auctionid=${AuctionID}`, {
        method: 'GET'
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();

      return await result;

    } catch (error) {
      console.error("Error during Auction Get By ID:", error);
      throw error;
    }
  };

  export const BidPlace = async (auctionid, bidamount) => {
    try {
        const requestBody = {
            auctionID: auctionid,
            bidAmount: bidamount
        };

      const response = await fetch(`${BaseUrl}/Bid/PlaceBid`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getJwt()}`
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      return true;
      
    } catch (error) {
      console.error("Error during Auction Creation:", error);
      throw error;
    }
  };