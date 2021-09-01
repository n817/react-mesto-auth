import React from 'react';
import logo from '../images/logo.svg';

function Header({ loggedIn, email }) {
  return (
    <header className="header page__section">
      <img src={logo} alt="Логотип" className="header__logo"/>
      <div className="header__auth-section">
        <p className={`header__user-email ${loggedIn ? 'header__user-email_visible' : ''}`}>{email}</p>
        <button className="header__login-button">{loggedIn ? 'Выйти' : 'Регистрация'}</button>
      </div>
    </header>
  );
}

export default Header;
