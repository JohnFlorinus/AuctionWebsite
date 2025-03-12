import './AuctionItems.css';
import { Link } from 'react-router-dom'

    const AuctionItems = ({auctiondata}) => {
      return (
        <div className="auction-items">
          {auctiondata.map((auction) => (
            <div key={auction.auctionID} className="auction-item">
              <Link to={`/auction/${auction.auctionID}`}>
              <img
                src={auction.image}
                alt={auction.title}
                className="auction-image"
              />
              <div className="details-overlay">
                {auction.title}
                <br/>
                {auction.highestBidOrPrice.toFixed()} kr
              </div>
              </Link>
            </div>
          ))}
        </div>
      );
    };
    
    export default AuctionItems;