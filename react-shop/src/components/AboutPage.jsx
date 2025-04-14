import React from 'react';
import { FaLeaf, FaTruck, FaShoppingBasket } from 'react-icons/fa'; // Исправлен импорт иконок
import { GiFarmer } from 'react-icons/gi'; // Добавлен правильный импорт GiFarmer
import './AboutPage.css';

const AboutPage = () => { // Исправлен синтаксис объявления компонента
  return (
    <div className="about-page">
      {/* Герой-секция с фермерской тематикой */}
      <section className="hero-section" style={{backgroundImage: 'url("/images/farm-banner.jpg")'}}>
        <div className="hero-overlay">
          <h1>Наша ферма — ваша свежесть</h1>
          <p>100% натуральные продукты с доставкой до двери</p>
        </div>
      </section>

      {/* Основной контент */}
      <div className="content-container">
        {/* Блок "О нас" */}
        <section className="about-block">
          <div className="icon-title">
            <FaLeaf className="icon" />
            <h2>Наша философия</h2>
          </div>
          <p>
            Мы — семейная ферма из Краснодарского края, которая с 2010 года выращивает
            овощи, фрукты и зелень без химикатов и ГМО. Каждый продукт в вашей корзине
            проходит путь всего в 24-48 часов от грядки до вашего стола.
          </p>

          <div className="advantages-grid">
            <div className="advantage-card">
              <GiFarmer className="advantage-icon" />
              <h3>Прямые поставки</h3>
              <p>Работаем без посредников от фермы к вам</p>
            </div>
            <div className="advantage-card">
              <FaShoppingBasket className="advantage-icon" /> {/* Заменена иконка */}
              <h3>Свежесть</h3>
              <p>Сбор урожая в день доставки</p>
            </div>
            <div className="advantage-card">
              <FaTruck className="advantage-icon" />
              <h3>Быстрая доставка</h3>
              <p>Доставляем за 2-4 часа после сбора</p> {/* Исправлена опечатка */}
            </div>
          </div>
        </section>

        {/* Блок "Производство" */}
        <section className="production-block">
          <h2>Как мы выращиваем</h2>
          <div className="production-steps">
            <div className="step">
              <span className="step-number">1</span>
              <h3>Экологичное земледелие</h3> {/* Исправлена опечатка */}
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
            <img src="/images/farm-1.jpg" alt="Наши теплицы" />
            <img src="/images/farm-2.jpg" alt="Сбор урожая" />
            <img src="/images/farm-3.jpg" alt="Упаковка" />
          </div>
        </section>

        {/* Блок "Команда" */}
        <section className="team-block">
          <h2>Наша фермерская семья</h2>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <img src={member.photo} alt={member.name} />
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <p className="bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA с сезонным предложением */}
      <section className="seasonal-cta">
        <div className="cta-content">
          <h2>Сезонное предложение!</h2>
          <p>Свежая клубника и черешня прямо с грядки — скидка 15% на первый заказ</p>
          <button className="cta-button">Заказать сейчас</button>
        </div>
      </section>
    </div>
  );
}

// Данные команды
const teamMembers = [
  {
    id: 1,
    name: "Иван и Мария Петровы",
    role: "Основатели фермы",
    bio: "15 лет выращиваем натуральные продукты для вашего стола",
    photo: "/team/farmers-1.jpg"
  },
  {
    id: 2,
    name: "Алексей Семёнов",
    role: "Главный агроном",
    bio: "Контролирует качество каждого растения",
    photo: "/team/agronom.jpg"
  }
];

export default AboutPage;
