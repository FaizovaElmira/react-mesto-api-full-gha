import React, { useState } from 'react';
import headerLogo from "../images/logo.svg";
import { Link, Routes, Route } from 'react-router-dom';

function Header({ email, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleSignOut() {
    setIsMenuOpen(false);
    onSignOut();
  }

  return (
    <header className="header">
      <div className={`header__info-burger ${isMenuOpen ? "header__info-burger_opened" : ""}`}>
        <span className="header__email">{email}</span>
        <button className="header__button" onClick={handleSignOut}>Выйти</button>
      </div>
      <div className="header__logo-container">
        <img className="header__logo" src={headerLogo} alt="Логотип" />
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <button
                  className={`header__menu-button ${isMenuOpen ? "header__menu-button_opened" : ""}`}
                  onClick={handleToggleMenu}
                ></button>
                <nav className={`header__info ${isMenuOpen ? "header__info_visible" : ""}`}>
                  <span className="header__email">{email}</span>
                  <button className="header__button" onClick={handleSignOut}>Выйти</button>
                </nav>
              </>
            }
          />
        </Routes>
      </div>
    </header>
  )
}

export default Header;
