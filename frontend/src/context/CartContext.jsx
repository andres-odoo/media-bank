import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load cart items when user changes
  useEffect(() => {
    if (user?.id) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]);
    }
  }, [user]);

  const addToCart = (item) => {
    if (!user?.id) return;
    
    setCartItems((prevItems) => {
      const newItems = prevItems.find((i) => i.id === item.id)
        ? prevItems
        : [...prevItems, item];
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (itemId) => {
    if (!user?.id) return;

    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== itemId);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newItems));
      return newItems;
    });
  };

  const isInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const clearCart = () => {
    if (!user?.id) return;
    
    setCartItems([]);
    localStorage.removeItem(`cart_${user.id}`);
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
