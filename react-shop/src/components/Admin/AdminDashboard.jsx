import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    async function fetchData() {
      try {
        const [users, orders, products] = await Promise.all([
          axios.get('http://localhost:8000/api/admin/users/', { headers }),
          axios.get('http://localhost:8000/api/admin/orders/', { headers }),
          axios.get('http://localhost:8000/api/admin/products/', { headers }),
        ]);

        setStats({
          users: users.data.length,
          orders: orders.data.length,
          products: products.data.count,
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных дашборда:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>📊 Панель администратора</h1>
      <div className="dashboard-cards">
        <Link to="/admin/users" className="card users">👤 Пользователи: {stats.users}</Link>
        <Link to="/admin/orders" className="card orders">🛒 Заказы: {stats.orders}</Link>
        <Link to="/admin/products" className="card products">🥬 Продукты: {stats.products}</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
