import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for styling

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Online Grocery Store</Link>
            </div>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                    <li>
                        <Link to="/auth">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;