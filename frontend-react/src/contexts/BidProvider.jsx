import { createContext, useState } from 'react';
import { BidGetAll, BidPlace } from '../services/BidApi';

export const BidContext = createContext();

const BidProvider = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

    const getAllBids = async (id) => {
      try {
        if (!id) {
            setSuccessMessage('');
            setErrorMessage('Auktionsid saknas');
            return;
          }
          
        const bidResult = await BidGetAll(id);
        setErrorMessage('');
        return await bidResult;

      } catch (error) {
        // inget felmeddelande - ingen bud historia kan finnas
      }
    };

    const placeBid = async (id, bidamount) => {
        try {
          if (!id || !bidamount) {
              setSuccessMessage("");
              setErrorMessage('Du måste först fylla i ett bud');
              return;
          }
          if (bidamount>2147483647) { // int32 limit
            setSuccessMessage(""),
              setErrorMessage('Budet är för högt . . .');
              return;
          }
            
          const bidResult = await BidPlace(id, bidamount);
          
          setErrorMessage("");
          setSuccessMessage(bidResult);

          return await bidResult;

        } catch (error) {
          setSuccessMessage("");
          setErrorMessage(error.message);
        }
      };

  return (
    <BidContext.Provider
      value={{
        errorMessage,
        successMessage,
        setErrorMessage,
        setSuccessMessage,
        placeBid,
        getAllBids,
      }}
    >
      {props.children}
    </BidContext.Provider>
  );
};

export default BidProvider;