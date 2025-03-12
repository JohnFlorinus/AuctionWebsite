import { createContext, useState } from 'react';
import { BidGetAll, BidPlace } from '../services/BidApi';

export const BidContext = createContext();

const BidProvider = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [bidsHistory, setBidsHistory] = useState(null);

    const getAllBids = async (id) => {
      try {
        setErrorMessage('');
        setSuccessMessage('');
        if (!id) {
            setErrorMessage('Auktionsid saknas');
            return;
          }
          
        const bidResult = await BidGetAll(id);
        
        if (bidResult) {
            setBidsHistory(bidResult);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    const placeBid = async (id, bidamount) => {
        try {
          setErrorMessage('');
          setSuccessMessage('');
          if (!id) {
              setErrorMessage('Auktionsid saknas');
              return;
            }
            
          const bidResult = await BidGetAll(id);
          
          if (bidResult) {
              setBidsHistory(bidResult);
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
      };

  return (
    <BidContext.Provider
      value={{
        errorMessage,
        successMessage,
        placeBid,
        getAllBids,
        bidsHistory,
      }}
    >
      {props.children}
    </BidContext.Provider>
  );
};

export default BidProvider;