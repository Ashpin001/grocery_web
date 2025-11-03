import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const qty = cart.reduce((s, i) => s + (i.qty || 0), 0);

  return (
    <header className="app-nav">
      <div className="nav-inner">
        <Link className="brand" to="/">Grocery</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart ({qty})</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
