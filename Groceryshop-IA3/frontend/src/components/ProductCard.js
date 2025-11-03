import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-img-wrap">
          <img src={product.image || '/placeholder.png'} alt={product.name} />
        </div>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
      </Link>
      <div className="product-footer">
        <div className="price">₹{(product.price ?? 0).toFixed(2)}</div>
        <button className="btn" onClick={() => onAdd(product)} disabled={!product.countInStock}>Add</button>
      </div>
    </article>
  );
}
