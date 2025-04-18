import { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      return existing
        ? prev.map(item =>
            item.id === product.id
              ? {...item, quantity: item.quantity + 1}
              : item
          )
        : [...prev, {...product, quantity: 1}];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Добавьте этот хук в тот же файл
export const useCart = () => useContext(CartContext);
