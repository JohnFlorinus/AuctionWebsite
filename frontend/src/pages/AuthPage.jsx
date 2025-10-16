import { useContext } from 'react';
import AuthForm from '../components/AuthForm/AuthForm';
import { AuthContext } from '../contexts/AuthProvider';

const AuthPage = () => {
  const {
    loggedIn,
    loginUser,
    registerUser,
    logoutUser,
    errorMessage,
    successMessage,
  } = useContext(AuthContext);

  return (
    <div className="view">
      {loggedIn && !successMessage ? (
        <div className="logout-container">
          <button onClick={logoutUser} className="logout-button">
            Logga ut
          </button>
        </div>
      ) : (
        <AuthForm
          onLogin={loginUser}
          onRegister={registerUser}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
    </div>
  );
};

export default AuthPage;