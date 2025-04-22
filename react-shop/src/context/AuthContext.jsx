import {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    // Создаем экземпляр axios с базовыми настройками
    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Добавляем перехватчик для токенов
    api.interceptors.request.use(config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Добавляем перехватчик для обработки ошибок
    api.interceptors.response.use(
        response => response, // Возвращаем успешный ответ
        error => {
            // Логируем ошибки
            console.error('Error response from server:', error.response);
            // Можно добавить дополнительную обработку, например:
            if (error.response && error.response.status === 401) {
                alert('Session expired. Please login again.');
                logout(); // Логируем пользователя
            }
            return Promise.reject(error); // Возвращаем ошибку для дальнейшей обработки
        }
    );

    // Проверка аутентификации при загрузке
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const {data} = await api.get('/api/profile/');
                    setUser(data);
                } catch (err) {
                    logout();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);


// Функция входа
const login = async (authData) => {
    try {
        // Сохраняем токены
        localStorage.setItem('access_token', authData.tokens.access);
        localStorage.setItem('refresh_token', authData.tokens.refresh);

        // Обновляем состояние
        setUser(authData.user);

        return {success: true};
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Ошибка входа'
        };
    }
};

// Функция выхода
const logout = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            await api.post('/api/auth/logout/', {refresh: refreshToken});
        }
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    }
};

return (
    <AuthContext.Provider value={{user, loading, login, logout}}>
        {children}
    </AuthContext.Provider>
);
}
;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
