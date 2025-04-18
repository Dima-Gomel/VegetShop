import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Импортируем контекст корзины

const CartIcon = () => {
  const { cartItems } = useCart(); // Получаем состояние корзины

  return (
    <Link to="/cart" className="cart-icon">
      <span className="cart-icon__icon">🛒</span>
      {cartItems.length > 0 && (
        <span className="cart-icon__count">
          {cartItems.reduce((total, item) => total + item.quantity, 0)}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
