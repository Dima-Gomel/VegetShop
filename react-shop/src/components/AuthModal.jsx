import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const AuthModal = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setError('');
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    if (isLogin) {
      // Логин
      const response = await axios.post(
        'http://localhost:8000/api/token/',
        {
          username: formData.username,
          password: formData.password
        },
        { withCredentials: true }
      );

      // Получаем данные пользователя
      const userResponse = await axios.get(
        'http://localhost:8000/api/profile/',
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${response.data.access}`
          }
        }
      );

      onLoginSuccess(userResponse.data);
    } else {
      // Регистрация
      await axios.post(
        'http://localhost:8000/api/register/',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      );

      // Автоматический вход после регистрации
      const loginResponse = await axios.post(
        'http://localhost:8000/api/token/',
        {
          username: formData.username,
          password: formData.password
        },
        { withCredentials: true }
      );

      const userResponse = await axios.get(
        'http://localhost:8000/api/profile/',
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${loginResponse.data.access}`
          }
        }
      );

      onLoginSuccess(userResponse.data);
    }

    onClose();
  } catch (err) {
    setError(
      err.response?.data?.detail ||
      err.response?.data?.message ||
      Object.values(err.response?.data || {}).flat().join('\n') ||
      'Произошла ошибка. Попробуйте снова.'
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-content">
        <button
          className="auth-close-btn"
          onClick={onClose}
          aria-label="Закрыть"
          disabled={isLoading}
        >
          &times;
        </button>

        <h2 className="auth-modal-title">
          {isLogin ? 'Вход' : 'Регистрация'}
        </h2>

        {error && <div className="auth-error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
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
              disabled={isLoading}
            />
          </div>

          {!isLogin && (
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
                disabled={isLoading}
              />
            </div>
          )}

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
              disabled={isLoading}
              minLength={isLogin ? undefined : 8}
            />
            {!isLogin && (
              <div className="auth-hint">Минимум 8 символов</div>
            )}
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="auth-spinner">Загрузка...</span>
            ) : isLogin ? (
              'Войти'
            ) : (
              'Зарегистрироваться'
            )}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
