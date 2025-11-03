import React from 'react';
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import './Home.css'; // Assuming you will create a Home.css for specific styles

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <Header />
            <main className="main-content">
                <h1>Welcome to the Online Grocery Store</h1>
                <p>Find the best products at unbeatable prices!</p>
                <ProductList />
            </main>
        </div>
    );
};

export default Home;