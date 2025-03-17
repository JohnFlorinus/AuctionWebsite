import { useContext, useEffect, useState } from 'react';
import { AuctionContext } from '../contexts/AuctionProvider';
import { BidContext } from '../contexts/BidProvider'
import { AuthContext } from '../contexts/AuthProvider'
import AuctionItem from '../components/AuctionItem/AuctionItem'
import { useParams } from 'react-router-dom';

const AuctionItemPage = () => {
  const { getAuctionById, updateAuction, deleteAuction, searchAuctions } = useContext(AuctionContext);
  const { getAllBids, placeBid, errorMessage, successMessage, setErrorMessage, setSuccessMessage } = useContext(BidContext);
  const { loggedIn, userID } = useContext(AuthContext);
  const { auctionID } = useParams();
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidsHistory, setBidsHistory] = useState(null);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        setSelectedAuction(await getAuctionById(auctionID));
        setBidsHistory(await getAllBids(auctionID));
      } catch (error) {
        console.error('Error fetching auction:', error);
      }
    };

    fetchAuction();
  }, [auctionID, getAuctionById]);

  return (
    <>
    {selectedAuction ? (
      <AuctionItem 
      auction={selectedAuction}
      bidsHistory={bidsHistory}
      placeBid={placeBid}
      loggedIn={loggedIn}
      userID={userID}
      errorMessage={errorMessage}
      successMessage={successMessage}
      setErrorMessage={setErrorMessage}
      setSuccessMessage={setSuccessMessage}
      updateAuction={updateAuction}
      deleteAuction={deleteAuction}
      searchAuctions={searchAuctions}/>
    ) : (
      <div>Loading auction id {auctionID}, it may have been deleted...</div>
    )}
    </>
  );
};

export default AuctionItemPage;