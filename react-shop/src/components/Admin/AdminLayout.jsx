import {Outlet, Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import {useEffect, useState} from 'react';
import './AdminLayout.css';

const AdminLayout = () => {
    const {user, loading} = useAuth();
    const navigate = useNavigate();
    const [accessChecked, setAccessChecked] = useState(false);


    useEffect(() => {
        // console.log('Проверка доступа:', {user, loading});

        if (!loading) {
            if (!user) {
                console.log('Пользователь не авторизован - редирект на /login');
                navigate('/login', {replace: true, state: {from: 'admin'}});
            } else if (!user.is_staff) {
                console.log('Недостаточно прав - редирект на /access-denied');
                navigate('/access-denied', {replace: true});
            } else {
                console.log('Доступ разрешен для:', user.username);
            }
            setAccessChecked(true);
        }
    }, [user, loading, navigate]);

    // const handleLogout = async () => {
    //     if (window.confirm('Вы уверены, что хотите выйти?')) {
    //         await logout();
    //         navigate('/login');
    //     }
    // };

    if (loading || !accessChecked) {
        return (
            <div className="admin-loading">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
                <p>Проверка прав доступа...</p>
            </div>
        );
    }

    if (!user || !user.is_staff) {
        return null;
    }

     return (
        <div className="admin-layout">
            <nav className="admin-sidebar">
                <div className="sidebar-header">
                    <h3>Панель управления</h3>
                    <div className="user-info">
                        <span className="username">{user.username}</span>
                        {user.is_superuser && (
                            <span className="badge bg-success">Суперпользователь</span>
                        )}
                        <span className="user-email">{user.email}</span>
                    </div>
                </div>

                <ul className="admin-menu">
                    <li>
                        <Link to="/admin/dashboard" className="menu-item">
                            <i className="bi bi-speedometer2"></i>
                            <span>Панель админа</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orders" className="menu-item">
                            <i className="bi bi-list-check"></i>
                            <span>Заказы</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products" className="menu-item">
                            <i className="bi bi-box-seam"></i>
                            <span>Товары</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users" className="menu-item">
                            <i className="bi bi-people"></i>
                            <span>Пользователи</span>
                        </Link>
                    </li>

                    <li className="menu-divider"></li>

                    {/*<li>*/}
                    {/*    <button*/}
                    {/*        onClick={handleLogout}*/}
                    {/*        className="menu-item logout-btn"*/}
                    {/*        title="Выйти из системы"*/}
                    {/*    >*/}
                    {/*        <i className="bi bi-box-arrow-right"></i>*/}
                    {/*        <span>Выйти</span>*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                </ul>
            </nav>

            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
