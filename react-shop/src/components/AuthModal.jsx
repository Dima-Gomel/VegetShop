import React, { useState } from 'react';
import '../index.css' // Наши кастомные стили

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправка данных:', formData);
    // Ваша логика отправки
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-content">
        <button
          className="auth-close-btn"
          onClick={onClose}
          aria-label="Закрыть"
        >
          &times;
        </button>

        <h2 className="auth-modal-title">
          {isLogin ? 'Вход' : 'Регистрация'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-form-group">
              <label htmlFor="username">Имя пользователя</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="auth-form-input"
              />
            </div>
          )}

          <div className="auth-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="auth-form-input"
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="auth-form-input"
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
          >
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="auth-toggle-mode">
          {isLogin ? (
            <p>
              Нет аккаунта?{' '}
              <button
                type="button"
                className="auth-mode-switch"
                onClick={() => setIsLogin(false)}
              >
                Зарегистрируйтесь
              </button>
            </p>
          ) : (
            <p>
              Уже есть аккаунт?{' '}
              <button
                type="button"
                className="auth-mode-switch"
                onClick={() => setIsLogin(true)}
              >
                Войдите
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;