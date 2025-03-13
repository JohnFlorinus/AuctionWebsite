import { useContext } from 'react';
import { AuctionContext } from '../contexts/AuctionProvider';
import { AuthContext } from '../contexts/AuthProvider'
import AuctionItems from '../components/AuctionItems/AuctionItems';
import AuctionCreateForm from '../components/AuctionCreateForm/AuctionCreateForm';

const AuctionsPage = () => {
  const {
    auctions,
    createAuction,
    errorMessage,
    successMessage,
  } = useContext(AuctionContext);

  const {
    loggedIn
  } = useContext(AuthContext);

  return (
    <>
      <AuctionItems auctiondata={auctions} />
      <br />
      {loggedIn && (
        <AuctionCreateForm
          onAuctionCreate={createAuction}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
    </>
  );
};

export default AuctionsPage;











/*    import { useState, useEffect } from 'react';
    import { AuctionSearch, AuctionCreate } from '../services/AuctionApi';
    import { getJwt } from '../utils/JwtHandler';
    import AuctionItems from '../components/AuctionItems/AuctionItems';
    import AuctionCreateForm from '../components/AuctionCreateForm/AuctionCreateForm';

    const Auctions = () => {
      const [auctions, setAuctions] = useState([]);
      const [errorMessage, setErrorMessage] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
      const [loggedIn, setLoggedIn] = useState(false);
    
      useEffect(() => {
        // för conditional rendering i auction creation form
        const token = getJwt();
        if (token) {
          setLoggedIn(true);
        }

        // fixa fram alla items
        fetchAuctions("");
      }, []);

      
      // sök
      const fetchAuctions = async (condition) => {
        try {
          const data = await AuctionSearch(condition);
          setAuctions(data);
        } catch (error) {
          console.error('Kunde inte hämta auktioner: ', error);
        }
      };

      const onAuctionCreate = async (title,description,price,image) => {
          try {
            setErrorMessage('');
            setSuccessMessage('');
            if (!title||!description||!price||!image) {
              setErrorMessage('Du måste fylla i alla textboxar');
              return;
            }
            if (await AuctionCreate(title,description,price,image)) {
              setSuccessMessage(`Auktion ${title} har skapats`);
              await fetchAuctions("");
            }
          } catch (error) {
            setErrorMessage(error.message);
          }
      };
      
      return (
        <>
        <AuctionItems
        auctiondata={auctions}/>
      <br/>
      {loggedIn && <AuctionCreateForm
      onAuctionCreate={onAuctionCreate}
      errorMessage={errorMessage}
      successMessage={successMessage}
      setErrorMessage={setErrorMessage}
      setSuccessMessage={setSuccessMessage}/>}
      </>
      );
    };
    
    export default Auctions;
    */

