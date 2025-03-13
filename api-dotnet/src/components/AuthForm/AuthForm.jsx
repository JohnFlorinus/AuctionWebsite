import { useRef } from 'react';
import './AuthForm.css';

const AuthForm = ({ onLogin, onRegister, errorMessage, successMessage }) => {
  const userRef = useRef(null);
  const passRef = useRef(null);

  const handleLoginClick = async (e) => {
    e.preventDefault();
    const username = userRef.current.value;
    const password = passRef.current.value;
    await onLogin(username, password);
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    const username = userRef.current.value;
    const password = passRef.current.value;
    await onRegister(username, password);
  };

  return (
    <div className="auth-form">
      <form>
        <div className="input-group">
          <input type="text" placeholder="Username" id="username" ref={userRef} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" id="password" ref={passRef} />
        </div>
        <div className="button-group">
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleRegisterClick}>Register</button>
        </div>
      </form>
      <br />
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
};

export default AuthForm;


















/*import { useRef } from 'react';
import './AuthForm.css';

const AuthForm = ({ onLogin, onRegister, errorMessage, successMessage, setErrorMessage, setSuccessMessage }) => {
  const userRef = useRef(null);
  const passRef = useRef(null);

  const handleLoginClick = async (e) => {
    e.preventDefault(); // så sidan inte refreshar
    const username = userRef.current.value;
    const password = passRef.current.value;
    await onLogin(username, password);
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault(); // så sidan inte refreshar
    const username = userRef.current.value;
    const password = passRef.current.value;
    await onRegister(username, password);
  };

  return (
    <div className="auth-form">
      <form>
        <div className="input-group">
          <input type="text" placeholder="Username" id="username" ref={userRef} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" id="password" ref={passRef} />
        </div>
        <div className="button-group">
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleRegisterClick}>Register</button>
        </div>
      </form>
      <br/>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
};

export default AuthForm;
*/
