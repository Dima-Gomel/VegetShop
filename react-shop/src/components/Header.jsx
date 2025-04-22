import React, {useState} from "react";
import logo from '../assets/images/logo.png';
import {Link} from "react-router-dom";
import AuthModal from "./AuthModal";
import CartIcon from "./CartIcon";
import {useAuth} from "../context/AuthContext";
import {useCart} from "./CartContext";
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const {user, loading, login, logout} = useAuth();
    const {cartItems} = useCart();
    const navigate = useNavigate();
    const handleLoginSuccess = async (authData) => {
        try {
            // authData содержит { tokens, user, username }
            const result = await login(authData);
            if (result.success) {
                setShowAuthModal(false);
                navigate('/'); // Перенаправляем на главную
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    if (loading) {
        return <div className="loading-overlay">Loading...</div>;
    }

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Логотип компании" className="logo"/>
                </Link>
                <h1>Овощи и фрукты к вашему столу</h1>
            </div>

            <nav className="navigation">
                <Link to="/products" className="nav-link">Каталог товаров</Link>
                <Link to="/about" className="nav-link">О нас</Link>
                <Link to="/contacts" className="nav-link">Контакты</Link>
            </nav>

            <div className="user-controls">
                <CartIcon count={cartItems.length}/>
                {user ? (
                    <div className="user-menu">
                        <span className="user-greeting">Привет, {user.username}</span>
                        <button
                            onClick={() => {
                                logout();
                                // Можно добавить перенаправление на главную
                            }}
                            className="btn btn-outline-danger"
                        >
                            Выйти
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowAuthModal(true)}
                        className="btn btn-success"
                        disabled={loading}
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
