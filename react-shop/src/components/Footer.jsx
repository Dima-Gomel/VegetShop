import React from 'react';
import '../index.css';
import logo from '../assets/images/logo.png';
import {FaFacebook, FaInstagram, FaTelegram, FaVk} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Лого и описание */}
                <div className="footer-section">
                    <img
                        src={logo}
                        alt="Логотип"
                        className="footer-logo"
                    />
                    <p className="footer-description">
                        Магазин свежих овощей и фруктов с доставкой по городу
                    </p>
                </div>

                {/* Меню */}
                <div className="footer-section">
                    <h3 className="footer-title">Меню</h3>
                    <ul className="footer-links">
                        <li><a href="/">Главная</a></li>
                        <li><a href="/products">Каталог товаров</a></li>
                        <li><a href="/about">О нас</a></li>
                        <li><a href="/contacts">Контакты</a></li>
                    </ul>
                </div>

                {/* Контакты */}
                <div className="footer-section">
                    <h3 className="footer-title">Контакты</h3>
                    <ul className="footer-contacts">
                        <li>+375 (29) 832-25-55</li>
                        <li>fruit@yandex.ru</li>
                        <li>Гомель, Каменщикова, 3</li>
                    </ul>
                </div>

                {/* Соцсети */}
                <div className="footer-section">
                    <h3 className="footer-title">Мы в соцсетях</h3>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook/></a>
                        <a href="https://www.instagram.com/" target="_blank"
                           rel="noopener noreferrer"><FaInstagram/></a>
                        <a href="https://t.me/Telegram" target="_blank" rel="noopener noreferrer"><FaTelegram/></a>
                        <a href="https://vk.ru/" target="_blank" rel="noopener noreferrer"><FaVk/></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Все права защищены.</p>
            </div>
        </footer>
    );
};


export default Footer;