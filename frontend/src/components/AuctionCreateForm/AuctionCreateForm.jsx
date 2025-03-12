import './AuctionCreateForm.css';
import { useRef} from 'react';

const AuctionCreateForm = ({onAuctionCreate, errorMessage, successMessage}) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();

    const handleCreate = async (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const price = priceRef.current.value;
        const image = imageRef.current.value;
        await onAuctionCreate(title,description,price,image);
    };

      return (
        <div className="auction-create">
            <h2>Create Auction</h2>
            <form>
                <input ref={titleRef} type="text" placeholder="Titel" />
                <textarea ref={descriptionRef} placeholder="Beskrivning" />
                <input ref={priceRef} type="number" placeholder="Pris (SEK)" />
                <input ref={imageRef} type="text" placeholder="Bild Länk" />
                <button onClick={handleCreate}>Skapa ny auktion</button>
                <p className="error-message"></p>
            </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
        </div>
      );
    };
    
    export default AuctionCreateForm;