import { getJwt } from './../utils/JwtHandler';

const BaseUrl = "https://localhost:7281/api";

export const AuctionSearch = async (title) => {
    try {
      const response = await fetch(`${BaseUrl}/Auction/SearchAuctions?Title=${title}`, {
        method: 'GET'
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();

      return await result;

    } catch (error) {
      console.error("Error during Auction Search:", error);
      throw error;
    }
  };

  export const AuctionGetByID = async (ID) => {
    try {
      const response = await fetch(`${BaseUrl}/Auction/GetAuctionByID?ID=${ID}`, {
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

  export const AuctionCreate = async (title, description, price, image) => {
    try {
        const requestBody = {
            Title: title,
            Description: description,
            Price: price,
            Image: image
        };

      const response = await fetch(`${BaseUrl}/Auction/create`, {
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