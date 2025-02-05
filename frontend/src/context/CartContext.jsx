import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.find((i) => i.id === item.id)
        ? prevItems
        : [...prevItems, item];
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const isInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    isInCart,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
