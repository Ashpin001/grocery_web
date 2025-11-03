import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart');
      setCart(raw ? JSON.parse(raw) : []);
    } catch (err) {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem('cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  function add(product, qty = 1) {
    setCart(prev => {
      const copy = [...prev];
      const idx = copy.findIndex(i => i._id === product._id);
      if (idx >= 0) { copy[idx].qty = (copy[idx].qty || 0) + qty; }
      else { copy.push({ ...product, qty }); }
      return copy;
    });
  }

  function updateQty(id, qty) {
    setCart(prev => prev.map(i => i._id === id ? { ...i, qty } : i).filter(i => i.qty > 0));
  }

  function clear() { setCart([]); }

  return (
    <CartContext.Provider value={{ cart, add, updateQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { return useContext(CartContext); }
