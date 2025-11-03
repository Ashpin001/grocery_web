import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { add } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then(setProduct)
      .catch((e) => { console.error(e); });
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card" style={{ padding: 16 }}>
        <h2 className="page-title">{product.name}</h2>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <img src={product.image || '/placeholder.png'} alt={product.name} style={{ maxWidth: '100%', maxHeight: 320, objectFit: 'contain' }} />
          </div>
          <div style={{ flex: 2 }}>
            <p style={{ color: '#4b5563' }}>{product.description}</p>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>₹{(product.price ?? 0).toFixed(2)}</div>
              <button className="btn" onClick={() => add(product, 1)} disabled={!product.countInStock}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
