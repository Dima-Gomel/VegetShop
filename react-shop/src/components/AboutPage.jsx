import React from 'react';
import {FaLeaf, FaTruck, FaShoppingBasket} from 'react-icons/fa'; // Исправлен импорт иконок
import {GiFarmer} from 'react-icons/gi';
import './AboutPage.css';
import vegetables from "../assets/images/Овощи.jpg";
import fruits from "../assets/images/Фрукты.jpg";
import greens from "../assets/images/Зелень.jpg";
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="about-page">
            <section className="hero-section" style={{backgroundImage: 'url("/images/farm-banner.jpg")'}}>
                <div className="hero-overlay">
                    <h1>Наш магазин — ваша свежесть</h1>
                    <p>100% натуральные продукты с доставкой до двери</p>
                </div>
            </section>

            <div className="content-container">
                <section className="about-block">
                    <div className="icon-title">
                        <FaLeaf className="icon"/>
                        <h2>Наша философия</h2>
                    </div>
                    <p>
                        Мы — семейная ферма из Гомеля, которая с 2010 года выращивает
                        овощи, фрукты и зелень без химикатов и ГМО. Также у нас проверенные поставщики зарубежного
                        товара.
                        Каждый продукт в вашей корзине
                        проходит путь всего в 24-48 часов от грядки до вашего стола.
                    </p>

                    <div className="advantages-grid">
                        <div className="advantage-card">
                            <GiFarmer className="advantage-icon"/>
                            <h3>Прямые поставки</h3>
                            <p>Работаем без посредников от фермы и производителей к вам</p>
                        </div>
                        <div className="advantage-card">
                            <FaShoppingBasket className="advantage-icon"/>
                            <h3>Свежесть</h3>
                            <p>Всегда свежие овощи и фрукты</p>
                        </div>
                        <div className="advantage-card">
                            <FaTruck className="advantage-icon"/>
                            <h3>Быстрая доставка</h3>
                            <p>Доставляем за 2-4 часа после заказа</p>
                        </div>
                    </div>
                </section>

                <section className="production-block">
                    <h2>Как мы выращиваем</h2>
                    <div className="production-steps">
                        <div className="step">
                            <span className="step-number">1</span>
                            <h3>Экологичное земледелие</h3>
                            <p>Используем только органические удобрения и севооборот</p>
                        </div>
                        <div className="step">
                            <span className="step-number">2</span>
                            <h3>Ручной сбор</h3>
                            <p>Каждый плод отбирается вручную на спелость</p>
                        </div>
                        <div className="step">
                            <span className="step-number">3</span>
                            <h3>Бережная упаковка</h3>
                            <p>Экоматериалы, сохраняющие свежесть</p>
                        </div>
                    </div>

                    <div className="farm-gallery">
                        <img src={vegetables} alt="Овощи"/>
                        <img src={fruits} alt="Фрукты"/>
                        <img src={greens} alt="Зелень"/>
                    </div>
                </section>
            </div>

            <section className="seasonal-cta">
                <div className="cta-content">
                    <h2>Сезонное предложение!</h2>
                    <p>Свежая клубника и черешня прямо с грядки — скидка 15% на первый заказ</p>
                    <Link to="/products" className="cta-button">За покупками</Link>
                </div>
            </section>
        </div>
    );
}


export default AboutPage;
