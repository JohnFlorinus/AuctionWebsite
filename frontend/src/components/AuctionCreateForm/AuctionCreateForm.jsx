import './AuctionCreateForm.css';
import { useRef} from 'react';

const AuctionCreateForm = ({onAuctionCreate, errorMessage, successMessage}) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();

  // omvandla fil till base64 för JSON API POST
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    const handleCreate = async (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const price = priceRef.current.value;
        const file = imageRef.current.files[0];
    let img64 = "";
    if (file) {
      img64 = await toBase64(file);
    }

        await onAuctionCreate(title,description,price,img64);
    };

      return (
        <div className="auction-create">
            <h2>Create Auction</h2>
            <form>
                <input ref={titleRef} type="text" placeholder="Titel" />
                <textarea ref={descriptionRef} placeholder="Beskrivning" />
                <input ref={priceRef} type="number" placeholder="Pris (SEK)" />
                <input ref={imageRef} type="file" accept="image/*" />
                <button onClick={handleCreate}>Skapa ny auktion</button>
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