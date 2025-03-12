/*import AuctionSearch from "../services/AuctionApi";
import{useState, createContext} from 'react';

export const GlobalContext = createContext();

const GlobalProvider = (props) => {

    const [auctions,setAuctions] = useState([]);

    const searchAuctions = (condition) => {
        AuctionSearch(condition)
        .then(result => {
            setAuctions(result);
        });
    }

    return(<GlobalProvider.Provider value={{auctions,searchAuctions}}>
            {props.children}
        </GlobalProvider.Provider>
    )
}

export default GlobalProvider;*/


import { createContext, useState, useEffect } from 'react';
import { AuctionSearch, AuctionGetByID, AuctionCreate } from '../services/AuctionApi';
import { getJwt } from '../utils/JwtHandler';

export const AuctionContext = createContext();

const AuctionProvider = (props) => {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Hämta alla auktioner
    searchAuctions("");
  }, []);


  const searchAuctions = async (condition) => {
    try {
      const data = await AuctionSearch(condition);
      setAuctions(data);
    } catch (error) {
      console.error('Kunde inte hämta auktioner: ', error);
    }
  };

  const getAuctionById = async (condition) => {
    try {
      const data = await AuctionGetByID(condition);
      setSelectedAuction(data);
    } catch (error) {
      console.error('Kunde inte hämta auktioner: ', error);
    }
  };

  const createAuction = async (title, description, price, image) => {
    try {
      setErrorMessage('');
      setSuccessMessage('');
      if (!title || !description || !price || !image) {
        setErrorMessage('Du måste fylla i alla textboxar');
        return;
      }

      const result = await AuctionCreate(title, description, price, image);
      if (result) {
        setSuccessMessage(`Auktion ${title} har skapats`);
        await searchAuctions("");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <AuctionContext.Provider
      value={{
        auctions,
        searchAuctions,
        createAuction,
        selectedAuction,
        getAuctionById,
        errorMessage,
        successMessage,
      }}>
      {props.children}
    </AuctionContext.Provider>
  );
};

export default AuctionProvider;