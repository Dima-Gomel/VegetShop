import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Badge } from 'react-bootstrap';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/admin/orders/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    await axios.patch(`/api/admin/orders/${orderId}/`,
      { status },
      { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
    );
    setOrders(orders.map(o => o.id === orderId ? {...o, status} : o));
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="p-4">
      <h2>Управление заказами</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Клиент</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user.email}</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td>{order.total_amount} ₽</td>
              <td>
                <Badge bg={
                  order.status === 'completed' ? 'success' :
                  order.status === 'canceled' ? 'danger' : 'warning'
                }>
                  {order.status}
                </Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="outline-success"
                  onClick={() => updateOrderStatus(order.id, 'completed')}
                >
                  Завершить
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() => updateOrderStatus(order.id, 'canceled')}
                >
                  Отменить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminOrdersPage;
