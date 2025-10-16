import { createContext, useState, useEffect } from 'react';
import { UserLogin, UserRegister } from '../services/UserApi';
import { getJwt, parseJwt } from '../utils/JwtHandler';
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = getJwt();
    if (token) {
      setLoggedIn(true);
      setUserID(parseJwt(token).UserID)
    }
  }, []);

    const loginUser = async (user, pass) => {
      try {
        setErrorMessage('');
        setSuccessMessage('');
        if (!user || !pass) {
            setErrorMessage('Användarnamn eller lösenord saknas');
            return;
          }
          
        const loginResult = await UserLogin(user, pass);
        
        if (loginResult) {
          setSuccessMessage('Du är nu inloggad, omdirigeras...');
          setLoggedIn(true);
          setUserID(parseJwt(getJwt()).UserID);
          setTimeout(() => {
            navigate('/');
            setSuccessMessage('');
          }, 2000);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
  
    const registerUser = async (user, pass) => {
      try {
        setErrorMessage('');
        setSuccessMessage('');
        if (!user || !pass) {
          setErrorMessage('Användarnamn eller lösenord saknas');
          return;
        }

        const registerResult = await UserRegister(user, pass);
        if (registerResult) {
            // sätt JWT & UserID via userlogin
            await UserLogin(user,pass);
            setSuccessMessage('Du är nu registrerad, omdirigeras...');
            setLoggedIn(true);
            setUserID(parseJwt(getJwt()).UserID);
            setTimeout(() => {
              navigate('/');
              setSuccessMessage('');
            }, 2000);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
  
    const logoutUser = () => {
      localStorage.removeItem('jwt-habibiauctions');
      setSuccessMessage('');
      setErrorMessage('Du är nu utloggad');
      setLoggedIn(false);
      setUserID('');
    };
  

  return (
    <AuthContext.Provider
      value={{
        errorMessage,
        successMessage,
        loggedIn,
        loginUser,
        registerUser,
        logoutUser,
        userID,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;