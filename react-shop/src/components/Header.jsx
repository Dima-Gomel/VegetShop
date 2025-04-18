import React, { useState } from "react";
import logo from '../assets/images/logo.png';
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import CartIcon from "./CartIcon";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";

const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { user, login, logout } = useAuth(); // Добавляем login из контекста
    const { cartItems } = useCart();

    const handleLoginSuccess = (userData) => {
        login(userData); // Используем функцию login из контекста
        setShowAuthModal(false);
    };

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Логотип компании" className="logo" />
                </Link>
                <h1>Овощи и фрукты к вашему столу</h1>
            </div>

            <nav className="navigation">
                <Link to="/products" className="nav-link">Каталог товаров</Link>
                <Link to="/about" className="nav-link">О нас</Link>
                <Link to="/contacts" className="nav-link">Контакты</Link>
            </nav>

            <div className="user-controls">
                <CartIcon />
                {user ? (
                    <div className="user-menu">
                        <span className="user-greeting">Привет, {user.username}</span>
                        <button
                            onClick={logout}
                            className="btn btn-outline-danger"
                        >
                            Выйти
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowAuthModal(true)}
                        className="btn btn-success"
                    >
                        Войти
                    </button>
                )}
            </div>

            {showAuthModal && (
                <AuthModal
                    onClose={() => setShowAuthModal(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </header>
    );
};

export default Header;