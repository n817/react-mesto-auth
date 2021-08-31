import React from 'react';
import logo from '../images/logo.svg';

function Header( {loggedIn} ) {
  return (
    <header className="header page__section">
      <img src={logo} alt="Логотип" className="header__logo"/>
      <div className="header__auth-section">
        <p className="header__user-email">test@test.ru</p>
        <button className="header__login-button">Выйти</button>
      </div>
    </header>
  );
}

export default Header;
