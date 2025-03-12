import './AuctionItem.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'

    const AuctionItem = ({auction, bidOnAuction}) => {
      const BidAmountRef = useRef();
      const navigate = useNavigate();

      return (
        <div className="auction-item-container">
          <div className="item-image-container">
              <img
                src={auction.image}
                alt={auction.title}
                className="item-image"
              />
          </div>

          <div className="item-details-container">
              <div className="item-details-overlay">
                <h2>{auction.title}</h2>
                <p>{auction.description}</p>
              </div>
              <div className="item-bid-overlay">
              <span>{auction.highestBidOrPrice.toFixed()} kr</span>

                <input type="text" ref={BidAmountRef} placeholder="Bid Amount"/>
                <button onClick={bidOnAuction}>Bid</button>
              </div>
              <button className="item-go-back-button" onClick={() =>{navigate("/")}}>Go Back</button>
          </div>
        </div>
      );
    };
    
export default AuctionItem;