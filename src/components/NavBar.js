import React from 'react';
import './NavBar.css';

const NavBar = ({ history }) => {
  return (
    <div className="navbar__header">
      <div className="navbar__section">
        <div className="app__title">Finding Falcone!</div>
        <div className="navbar__menu">
          <ul>
            <li>
              <button
                className="reset__btn"
                onClick={() => (window.location.href = '/')}
              >
                Reset
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
