import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import tomatoImg from '../assets/images/tomato.jpg';
import cucumberImg from '../assets/images/cucumber.jpg';
import appleImg from '../assets/images/apple.jpg';
import greensImg from '../assets/images/greens.jpg';

import { FaLeaf, FaShippingFast, FaPercentage, FaAward } from 'react-icons/fa';

const HomePage = () => {
  const featuredProducts = [
    { id: 1, name: 'Помидоры', price: '8 руб/кг', image: tomatoImg },
    { id: 2, name: 'Огурцы', price: '7 руб/кг', image: cucumberImg },
    { id: 3, name: 'Яблоки', price: '2,30 руб/кг', image: appleImg },
    { id: 4, name: 'Зелень', price: '1,50 руб/100 г', image: greensImg },
  ];

  return (
    <div className="home-page">
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Свежие овощи и фрукты с доставкой</h1>
          <p>Натуральные овощи и фрукты прямо с грядки в ваш дом</p>
          <Link to="/products" className="cta-button">Смотреть ассортимент</Link>
        </div>
      </section>

      <section className="benefits-section">
        <h2>Почему выбирают нас</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <FaLeaf className="benefit-icon" />
            <h3>Экологично</h3>
            <p>Без пестицидов и ГМО</p>
          </div>
          <div className="benefit-card">
            <FaShippingFast className="benefit-icon" />
            <h3>Быстрая доставка</h3>
            <p>В течение 2 часов</p>
          </div>
          <div className="benefit-card">
            <FaPercentage className="benefit-icon" />
            <h3>Выгодные цены</h3>
            <p>Дешевле, чем в супермаркете</p>
          </div>
          <div className="benefit-card">
            <FaAward className="benefit-icon" />
            <h3>Гарантия качества</h3>
            <p>Свежесть проверяется лично</p>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <h2>Хиты продаж</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div
                className="product-image"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
               <Link to="/products" className="add-to-cart">В каталог</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="special-offer">
        <div className="offer-content">
          <h2>Специальное предложение!</h2>
          <p>При первом заказе скидка <span>15%</span> по промокоду <strong>FRESH15</strong></p>
          <Link to="/products" className="offer-button">Воспользоваться</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
