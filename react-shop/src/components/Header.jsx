import React from "react";
import logo from '../assets/images/logo.png';
import {useState} from "react";
import AuthModal from "./AuthModal";
import {Link} from "react-router-dom";

const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/" className="logo-link">
                    <img
                        src={logo}
                        alt="Логотип компании"
                        className="logo"
                    />
                </Link>
                <h1>Овощи, фрукты и зелень к вашему столу</h1>
            </div>

            <nav className="navigation">
                <a href="/products">Каталог товаров</a>
                <a href="/about">О нас</a>
                <Link to="/contacts" className="nav-link">Контакты</Link>
            </nav>

            <div className="cart">
                <span>🛒</span>
                <span>0</span>
            </div>
            <button onClick={() => {
                setShowAuthModal(true);
            }}
                    className="btn btn-success"
            >
                Войти
            </button>
            {showAuthModal && (
                <AuthModal
                    onClose={() => {
                        setShowAuthModal(false);
                    }}
                />
            )}
        </header>
    );
};

export default Header;