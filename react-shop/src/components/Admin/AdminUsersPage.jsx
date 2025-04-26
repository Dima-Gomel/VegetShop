import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminUserPage.css';

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get('http://localhost:8000/api/admin/users/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error('Ошибка загрузки пользователей:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div className="user-list-container">
      <h2 className="title">👥 Список пользователей</h2>
      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <p className="username">{user.username}</p>
            <p className="email">📧 {user.email}</p>
            <p className={`role ${user.is_staff ? 'admin' : 'user'}`}>
              {user.is_staff ? 'Администратор' : 'Пользователь'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserPage;
