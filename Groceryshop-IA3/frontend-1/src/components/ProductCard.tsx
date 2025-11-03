import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Assuming you have a CSS file for styling

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, price, description }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <p className="product-price">${price.toFixed(2)}</p>
        <Link to={`/product/${id}`} className="view-details-button">View Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;