import React from "react";
import logo from '../assets/images/logo.png';
import {useState} from "react";
import AuthModal from "./AuthModal";

const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    return (
        <header className="header">
            <div className="logo-container">
                <img
                    src={logo}
                    alt="Логотип"
                    className="logo"
                />
                <h1>Овощи, фрукты и зелень к вашему столу</h1>
            </div>

            <nav className="navigation">
                {/*<a href="/">Главная</a>*/}
                <a href="/products">Каталог товаров</a>
                <a href="/about">О нас</a>
                <a href="/contacts">Контакты</a>
            </nav>

            <div className="cart">
                <span>🛒</span>
                <span>0</span>
            </div>
            <button onClick={() => {
                console.log('модалка');
                setShowAuthModal(true);
            }}
                    className="btn btn-success"
            >
                Войти
            </button>
            {showAuthModal && (
                <AuthModal
                    onClose={() => {
                        console.log('Closing modal');
                        setShowAuthModal(false);
                    }}
                />
            )}
        </header>
    );
};

export default Header;