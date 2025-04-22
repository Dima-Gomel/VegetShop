import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../index.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const AuthModal = ({onClose, onLoginSuccess}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFormData({
            username: '',
            email: '',
            password: '',
            password2: ''
        });
        setError('');
    }, [isLogin]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (username, password) => {
        try {
            const {data} = await axios.post(`${API_URL}/api/token/`, {
                username: username.trim(),
                password: password.trim()
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            // Получаем данные профиля сразу после входа
            const profileResponse = await axios.get(`${API_URL}/api/profile/`, {
                headers: {
                    'Authorization': `Bearer ${data.access}`
                }
            });

            // Возвращаем полные данные пользователя
            return {
                tokens: data,
                profile: profileResponse.data
            };

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const handleRegistration = async () => {
        try {
            const registrationData = {
                username: formData.username.trim(),
                email: formData.email.trim(),
                password: formData.password,
                password2: formData.password2
            };

            // 1. Регистрация
            await axios.post(`${API_URL}/api/register/`, registrationData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // 2. Автоматический вход после регистрации
            const userData = await handleLogin(formData.username, formData.password);
            return userData;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLogin) {
                if (!formData.username.trim() || !formData.password.trim()) {
                    throw new Error('Заполните имя пользователя и пароль');
                }

                // 1. Выполняем вход и получаем данные пользователя
                const authData = await handleLogin(formData.username, formData.password);

                // 2. Передаем ВСЕ данные в onLoginSuccess
                await onLoginSuccess({
                    username: formData.username.trim(),
                    tokens: authData.tokens,
                    profile: authData.profile
                });
            } else {
                // Валидация регистрации
                if (!formData.username.trim()) throw new Error('Введите имя пользователя');
                if (!formData.email.trim()) throw new Error('Введите email');
                if (!formData.password) throw new Error('Введите пароль');
                if (!formData.password2) throw new Error('Подтвердите пароль');
                if (formData.password !== formData.password2) throw new Error('Пароли не совпадают');
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) throw new Error('Введите корректный email');
                if (formData.password.length < 8) throw new Error('Пароль должен содержать минимум 8 символов');

                const userData = await handleRegistration();
                onLoginSuccess(userData);
            }
            onClose();
        } catch (err) {
            console.error('Auth error:', {
                error: err,
                response: err.response?.data
            });

            let errorMessage = 'Ошибка при выполнении операции';

            if (err.response?.data) {
                if (err.response.data.username) {
                    errorMessage = `Логин: ${err.response.data.username[0]}`;
                } else if (err.response.data.email) {
                    errorMessage = `Email: ${err.response.data.email[0]}`;
                } else if (err.response.data.password) {
                    errorMessage = `Пароль: ${err.response.data.password[0]}`;
                } else if (err.response.data.detail) {
                    errorMessage = err.response.data.detail;
                } else if (err.response.data.non_field_errors) {
                    errorMessage = err.response.data.non_field_errors[0];
                }
            } else {
                errorMessage = err.message || errorMessage;
            }

            setError(errorMessage);
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
                            minLength={!isLogin ? 8 : undefined}
                        />
                        {!isLogin && (
                            <div className="auth-hint">Минимум 8 символов</div>
                        )}
                    </div>

                    {!isLogin && (
                        <div className="auth-form-group">
                            <label htmlFor="password2">Подтверждение пароля</label>
                            <input
                                id="password2"
                                type="password"
                                name="password2"
                                value={formData.password2}
                                onChange={handleChange}
                                required
                                className="auth-form-input"
                                disabled={isLoading}
                            />
                        </div>
                    )}

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
