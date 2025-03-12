import { NavLink } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="site-header">
      <h1 className="site-title">ℌ𝔞𝔟𝔦𝔟𝔦 𝔄𝔲𝔠𝔱𝔦𝔬𝔫𝔰</h1>
      <nav className="navbar">
        <ul>
        <li>
            <NavLink to="/">🏷️Auktioner</NavLink>
          </li>
          <li>
            <NavLink to="/account" exact>👤Konto</NavLink>
          </li>
          <li>
            <NavLink to="/contact">✉️Kontakta oss</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;