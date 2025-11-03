import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/api';
import Button from '../components/ui/Button';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <p className="product-description">{product.description}</p>
            <h2>${product.price.toFixed(2)}</h2>
            <Button onClick={() => console.log('Add to cart')}>Add to Cart</Button>
        </div>
    );
};

export default ProductDetails;