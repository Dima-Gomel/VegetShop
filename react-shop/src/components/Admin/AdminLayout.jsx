import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-5">Проверка прав доступа...</div>;
  }

  if (!user || !user.is_staff) {
    return (
      <div className="container py-5 text-center">
        <h2>Доступ запрещен</h2>
        <p>Требуются права администратора</p>
        <Link to="/" className="btn btn-primary">
          На главную
        </Link>
      </div>
    );
  }

  // if (!user || !user.is_staff) {
  //   return <div className="container py-5 text-center">
  //     <h2>Доступ запрещен</h2>
  //     <p>Требуются права администратора</p>
  //   </div>;
  // }

  return (
    <div className="admin-layout">
      <nav className="admin-sidebar">
        <h3>Панель управления</h3>
        <ul>
          <li><Link to="/admin/dashboard">Дашборд</Link></li>
          <li><Link to="/admin/orders">Заказы</Link></li>
          <li><Link to="/admin/products">Товары</Link></li>
          <li><Link to="/admin/users">Пользователи</Link></li>
        </ul>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
