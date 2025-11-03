import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryStrip from '../components/CategoryStrip';
import { useCart } from '../context/CartContext';
import { sampleFreshFruits, sampleFreshVegetables, sampleDairy, sampleBakery, sampleStaples, sampleSnacks, sampleCookingOils } from '../data/sampleProducts';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { add } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then(setProducts)
      .catch((e) => { console.error(e); setProducts([]); });
  }, []);

  // Use shared sample arrays so Home shows the same products as CategoryDetail
  const getProductsForCategory = (key) => {
    switch (key) {
      case 'fruits-vegetables':
        return [...sampleFreshFruits.slice(0,6)];
      case 'dairy-eggs':
        return [...sampleDairy.slice(0,6)];
      case 'bakery':
        return [...sampleBakery.slice(0,6)];
      case 'staples':
        return [...sampleStaples.slice(0,6)];
      case 'snacks':
        return [...sampleSnacks.slice(0,6)];
      case 'cooking-oils':
        return [...sampleCookingOils.slice(0,6)];
      default:
        return products.slice(0,6);
    }
  };

  const renderCategoryRow = (title, key, link) => {
    const items = getProductsForCategory(key);
    if (!items || items.length === 0) return null;
    return (
      <section style={{margin:'28px 0'}} key={key}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <h2 style={{margin:0}}>{title}</h2>
          <a href={link} style={{color:'#0ea5a9',textDecoration:'none'}}>See all</a>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:16}}>
          {items.map(p => (
            <div key={p._id || p.name} style={{transform:'translateY(0)',transition:'transform .18s ease,box-shadow .18s ease'}} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 8px 20px rgba(2,6,23,0.08)'}} onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
              <ProductCard product={p} onAdd={(prod) => add(prod,1)} />
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
      <CategoryStrip />
            <h1>Fresh groceries delivered to your door</h1>
            <p>Quality produce, staples, and household essentials — fast delivery and great prices.</p>
          </div>
          {/* decorative hero image removed to avoid overlap with category cards */}
        </div>
      </section>

      <div className="container">
        {renderCategoryRow('Fruits & Vegetables', 'fruits-vegetables', '/category/fruits-vegetables')}
        {renderCategoryRow('Dairy & Eggs', 'dairy-eggs', '/category/dairy-eggs')}
        {renderCategoryRow('Bakery', 'bakery', '/category/bakery')}
        {renderCategoryRow('Staples', 'staples', '/category/staples')}
        {renderCategoryRow('Snacks', 'snacks', '/category/snacks')}
      </div>
    </>
  );
}
