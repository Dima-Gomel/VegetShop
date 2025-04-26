import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    phone: user?.phone || '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Проверяем авторизацию
    if (!user) {
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      console.log('token: ', token);
      const response = await fetch('http://localhost:8000/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user: user.id,
          items: cartItems.map(item => ({
            product: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          total_amount: totalPrice,
          ...formData
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ошибка при оформлении заказа');
      }

      clearCart();
      setOrderSuccess(true);
    } catch (err) {
      console.error('Ошибка при оформлении заказа:', err);
      setError(err.message || 'Произошла ошибка при оформлении заказа');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container py-4 text-center">
        <h2>Заказ успешно оформлен!</h2>
        <p>Спасибо за ваш заказ. Мы свяжемся с вами для подтверждения.</p>
        <Link to="/products" className="btn btn-primary">
          Вернуться к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Оформление заказа</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        <div className="col-md-7">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Адрес доставки</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Телефон</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Комментарий к заказу</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="form-control"
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || cartItems.length === 0}
            >
              {isSubmitting ? 'Оформляем...' : 'Подтвердить заказ'}
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ваш заказ</h5>
              <ul className="list-group list-group-flush">
                {cartItems.map(item => (
                  <li key={item.id} className="list-group-item">
                    {item.name} × {item.quantity} = {item.price * item.quantity} ₽
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between mt-3">
                <strong>Итого:</strong>
                <strong>{totalPrice} ₽</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;