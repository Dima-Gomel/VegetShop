import React, { useState } from 'react';

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
    // Здесь будет запрос к API
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Имя пользователя</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="toggle-mode">
          {isLogin ? (
            <p>Нет аккаунта? <span onClick={() => setIsLogin(false)}>Зарегистрируйтесь</span></p>
          ) : (
            <p>Уже есть аккаунт? <span onClick={() => setIsLogin(true)}>Войдите</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
