import { useState, useCallback } from 'react';

export function useCart() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  const addToCart = useCallback((productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => {
      const newCount = (prev[productId] || 0) - 1;
      if (newCount <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newCount };
    });
  }, []);

  const removeItemCompletely = useCallback((productId) => {
    setCart(prev => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
  }, []);

  const setCartProducts = useCallback((productsList) => {
    if (typeof productsList === 'function') {
      setProducts(productsList);
    } else {
      setProducts(productsList);
    }
  }, []);

  const getTotalItems = useCallback(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  return { 
    cart, 
    products,
    addToCart, 
    removeFromCart, 
    removeItemCompletely, 
    clearCart,
    setCartProducts,
    getTotalItems
  };
}