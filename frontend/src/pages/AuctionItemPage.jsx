import { useContext, useEffect, useState } from 'react';
import { AuctionContext } from '../contexts/AuctionProvider';
import { AuthContext } from '../contexts/AuthProvider'
import AuctionItem from '../components/AuctionItem/AuctionItem'
import { useParams } from 'react-router-dom';

const AuctionItemPage = () => {
  const { selectedAuction, getAuctionById } = useContext(AuctionContext);
  const { auctionID } = useParams();

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        await getAuctionById(auctionID);
      } catch (error) {
        console.error('Error fetching auction:', error);
      }
    };

    fetchAuction();
  }, [auctionID]);

  return (
    <>
      <AuctionItem auction={selectedAuction}/>
    </>
  );
};

export default AuctionItemPage;