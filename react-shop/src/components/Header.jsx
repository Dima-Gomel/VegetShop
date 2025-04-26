import React, { useState, useEffect } from "react";
import logo from '../assets/images/logo.png';
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import CartIcon from "./CartIcon";
import { useAuth } from "../context/AuthContext";
import { useCart } from "./CartContext";
import { useNavigate } from 'react-router-dom';
import './Header.css';


const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { user, loading, login, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleLoginSuccess = async (authData) => {
        setIsProcessing(true);
        try {
            const result = await login(authData);
            if (result.success) {
                setShowAuthModal(false);
                navigate('/', { state: { fromAuth: true } });
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleLogout = async () => {
        setIsProcessing(true);
        try {
            await logout();
            navigate('/', { state: { fromLogout: true } });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        if (user && showAuthModal) {
            setShowAuthModal(false);
        }
    }, [user, showAuthModal]);

    if (loading && !user) {
        return <div className="loading-overlay">Загрузка...</div>;
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
                <CartIcon count={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

                {user ? (
                    <div className="user-menu">
                        <div className="user-info">
                            <span className="user-greeting">Привет, {user.username}</span>
                            {user.is_staff && (
                                <Link to="/admin" className="admin-link">
                                    Админ-панель
                                </Link>
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline-danger"
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Выход...' : 'Выйти'}
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowAuthModal(true)}
                        className="btn btn-success"
                        disabled={loading || isProcessing}
                    >
                        {isProcessing ? 'Загрузка...' : 'Войти'}
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
