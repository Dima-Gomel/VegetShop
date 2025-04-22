import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { user } = useAuth();

  const handleQuantityChange = (productId, e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="cart-page container py-4">
      <h2 className="mb-4">Ваша корзина</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Ваша корзина пуста</p>
          <Link to="/products" className="btn btn-primary">
            Перейти к покупкам
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <div className="cart-items card mb-4">
              <div className="card-body">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item row align-items-center mb-3">
                    <div className="col-3 col-md-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-5 col-md-6">
                      <h5>{item.name}</h5>
                      <p className="text-muted">{item.price} ₽/шт</p>
                    </div>
                    <div className="col-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-2 text-end">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="checkout-card card">
              <div className="card-body">
                <h5 className="card-title">Итого</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>{totalPrice} ₽</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>Общая сумма</strong>
                  <strong>{totalPrice} ₽</strong>
                </div>

                {user ? (
                  <Link to="/checkout" className="btn btn-primary w-100">
                    Оформить заказ
                  </Link>
                ) : (
                  <Link to="/login" className="btn btn-primary w-100">
                    Войти для оформления
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
