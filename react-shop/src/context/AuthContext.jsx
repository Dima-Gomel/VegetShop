import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    // Создаем стабильный экземпляр axios с useMemo
    const api = useMemo(() => {
        const instance = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        instance.interceptors.request.use(config => {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        instance.interceptors.response.use(
            response => response,
            error => {
                console.error('Error response from server:', error.response);
                if (error.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return instance;
    }, [API_URL, logout]);

    const logout = useCallback(async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await api.post('/api/auth/logout/', { refresh: refreshToken });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setUser(null);
            api.interceptors.request.clear();
            api.interceptors.response.clear();
        }
    }, [api]);

    // Делаем login стабильной функцией
    const login = useCallback(async (authData) => {
        try {
            localStorage.setItem('access_token', authData.tokens.access);
            localStorage.setItem('refresh_token', authData.tokens.refresh);

            const { data } = await api.get('/api/profile/');
            setUser(data);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Ошибка входа'
            };
        }
    }, [api]);

    // Проверка аутентификации при загрузке
    useEffect(() => {
        let isMounted = true; // Флаг для избежания утечек памяти

        const initAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const { data } = await api.get('/api/profile/');
                    if (isMounted) setUser(data);
                } catch (err) {
                    if (isMounted) logout();
                }
            }
            if (isMounted) setLoading(false);
        };

        initAuth();

        return () => {
            isMounted = false; // Очистка при размонтировании
        };
    }, [api, logout]); // Добавляем зависимости

    const value = useMemo(() => ({
        user,
        loading,
        login,
        logout
    }), [user, loading, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};