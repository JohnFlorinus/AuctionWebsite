import { createContext, useState, useEffect } from 'react';
import { AuctionSearch, AuctionGetByID, AuctionCreate, AuctionUpdate, AuctionDelete } from '../services/AuctionApi';
import { getJwt } from '../utils/JwtHandler';

export const AuctionContext = createContext();

const AuctionProvider = (props) => {
  const [auctions, setAuctions] = useState([]);
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
      return data;
    } catch (error) {
      console.error('Kunde inte hämta auktion: ', error);
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

  const updateAuction = async (AuctionID, description) => {
    try {
      setErrorMessage('');
      setSuccessMessage('');
      if (!description) {
        setErrorMessage('Du måste fylla i en beskrivning');
        return;
      }
      const result = await AuctionUpdate(AuctionID, description);
        setSuccessMessage(`Auktionen har uppdateras`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const deleteAuction = async (AuctionID) => {
    try {
      setErrorMessage('');
      setSuccessMessage('');
      const userConfirmed = window.confirm("Är du säker på att du vill ta bort denna auktion?");
  if (userConfirmed) {
    const result = await AuctionDelete(AuctionID);
    searchAuctions("");
    return true;
  }
    }
  catch (error) {
    setErrorMessage(error.message);
  }
}

  return (
    <AuctionContext.Provider
      value={{
        auctions,
        searchAuctions,
        createAuction,
        updateAuction,
        deleteAuction,
        getAuctionById,
        errorMessage,
        successMessage,
      }}>
      {props.children}
    </AuctionContext.Provider>
  );
};

export default AuctionProvider;