import './AuctionItem.css';
import { useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom'

    const AuctionItem = ({auction, placeBid, bidsHistory, loggedIn, userID, errorMessage, successMessage, setErrorMessage, setSuccessMessage, updateAuction, deleteAuction, searchAuctions}) => {
      const BidAmountRef = useRef();
      const descriptionRef = useRef();
      const navigate = useNavigate();
      const [currentDescription,setCurrentDescription] = useState(auction.description);

      const handleBidPlacement = async () => {
        const amount = BidAmountRef.current.value;
        const feedback = await placeBid(auction.auctionID, amount);
        if (feedback=="Budet har lagts") {
          searchAuctions("");
        }
      };

      const handleUpdate = async () => {
        const description = descriptionRef.current.value;
        await updateAuction(auction.auctionID, description);
        setCurrentDescription(description);
      };

      const handleDelete = async () => {
        const result = await deleteAuction(auction.auctionID);
        if (result) {
          navigate("/");
        }
      };

      console.log("userid: " + userID);
      console.log("auction created by: " + auction.createdBy);

      return (
        <div className="auction-item-container">
          <div className="item-image-container">
              <img
                src={auction.picture}
                alt={auction.title}
                className="item-image"
              />
          </div>

          <div className="item-details-container">
              <div className="item-details-overlay">
                <h2>{auction.title}</h2>
                <p>{currentDescription}</p>
              </div>
            
              <div className="item-bid-overlay">

              <span className="current-bid-amount">Nuvarande Pris: {auction.highestBidOrPrice.toLocaleString().replace(",",".")} kr</span>

              {loggedIn && (
                <>
              <input type="text" ref={BidAmountRef} placeholder="Lägg ett bud..."/>
              <button onClick={handleBidPlacement} className="item-button">Bid</button>
              {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
                </>
              )}

              {bidsHistory && bidsHistory.length > 0 && (
            <div className="bid-history-container">
              <h3>Tidigare Auktionsbud</h3>
              <ul className="bid-history-list">
                {bidsHistory.map((bid) => (
                  <li className="bid-history-item" key={bid.BidID}>
                    {bid.Username}: {bid.BidAmount.toLocaleString().replace(",",".")} kr
                  </li>
                ))}
              </ul>
            </div>
          )}

              </div>

        {userID == auction.createdBy && (
          <div className="item-admin-actions">
            <textarea ref={descriptionRef} placeholder="Ny Beskrivning" /><br/>
            <button className="item-button" onClick={handleUpdate}>🔄 Uppdatera auktion</button><br/><br/>
            <button className="item-button" onClick={handleDelete}>🗑 Radera auktion</button>
          </div>
        )}

              <button className="item-button" onClick={() =>{navigate("/");setErrorMessage('');setSuccessMessage('');}}>Gå tillbaka</button>
          </div>
        </div>
      );
    };
    
export default AuctionItem;