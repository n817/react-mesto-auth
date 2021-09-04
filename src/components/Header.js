import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggedIn, email, onSignOut }) {
  const {pathname} = useLocation();

  return (
    <header className="header page__section">
      <img src={logo} alt="Логотип" className="header__logo"/>
      <div className="header__auth-section">
        <p className={`header__user-email ${loggedIn ? 'header__user-email_visible' : ''}`}>{email}</p>

        {loggedIn 
        ? (
          <Link to="/sign-in" className="header__link header__link_logout" onClick={onSignOut}>
            Выйти
          </Link>
        )
        : (
          pathname === "/sign-in" 
          ?
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          :
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
        )}

      </div>
    </header>
  );
}

export default Header;
