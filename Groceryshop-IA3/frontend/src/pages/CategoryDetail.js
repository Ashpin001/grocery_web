import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { sampleFreshFruits, sampleFreshVegetables, sampleDairy, sampleBakery, sampleStaples, sampleSnacks, sampleCookingOils } from '../data/sampleProducts';

const subcats = {
  'fruits-vegetables': [
    { id: 'all', title: 'All' },
    { id: 'fresh-fruits', title: 'Fresh Fruits' },
    { id: 'fresh-vegetables', title: 'Fresh Vegetables' },
  ],
  'dairy-eggs': [
    { id: 'all', title: 'All' },
    { id: 'milk', title: 'Milk & Dairy' },
    { id: 'eggs', title: 'Eggs' },
  ],
  'bakery': [ { id: 'all', title: 'All' } ],
  'staples': [ { id: 'all', title: 'All' } ],
  'snacks': [ { id: 'all', title: 'All' } ],
  'cooking-oils': [ { id: 'all', title: 'All' } ],
};

// sample arrays are imported from ../data/sampleProducts.js

export default function CategoryDetail(){
  const { slug, sub } = useParams();
  const items = subcats[slug] || [{id:'all', title:'All'}];
  const showSub = sub || null;
  const { add } = useCart();

  const toProduct = (p) => ({
    _id: p._id || p.id || p.name,
    name: p.name,
    description: p.description || (p.price ? `₹${p.price} / kg` : ''),
    image: p.image || '/placeholder.png',
    price: typeof p.price === 'number' ? p.price : 0,
    countInStock: p.countInStock || 10,
  });

  const renderGridFrom = (arr) => (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
      {arr.map(p => (
        <div key={p.id || p._id || p.name} style={{padding:6}}>
          <ProductCard product={toProduct(p)} onAdd={(prod) => add(prod,1)} />
        </div>
      ))}
    </div>
  );

  return (
    <div style={{maxWidth:1100,margin:'24px auto',padding:'0 16px'}}>
      <h2 style={{marginBottom:8, textTransform:'capitalize'}}>{slug.replace('-', ' & ')}</h2>
      <div style={{display:'flex',gap:16}}>
        <div style={{width:320}}>
          <div style={{border:'1px solid #eef2f7',borderRadius:8,overflow:'hidden',background:'#fff'}}>
            <div style={{padding:12,borderBottom:'1px solid #f1f5f9'}}>
              <strong>Categories</strong>
            </div>
            <div style={{padding:12}}>
              {items.map(it => (
                <Link key={it.id} to={`/category/${slug}/${it.id}`} style={{display:'block',padding:'12px',background:it.id===showSub ? '#e6f7ec' : (it.id==='fresh-fruits' ? '#fff' : 'transparent'),borderRadius:6,marginBottom:8,color:'#0f172a',textDecoration:'none'}}>
                  {it.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{flex:1}}>
          {slug === 'fruits-vegetables' && ((!showSub || showSub === 'all')) ? (
            <div>
              <h3 style={{marginBottom:12}}>Fresh Fruits — Price per kg</h3>
              {renderGridFrom(sampleFreshFruits)}

              <h3 style={{marginBottom:12}}>Fresh Vegetables — Price per kg</h3>
              {renderGridFrom(sampleFreshVegetables)}
            </div>
          ) : slug === 'fruits-vegetables' && showSub=== 'fresh-fruits' ? (
            <div>
              <h3 style={{marginBottom:12}}>Fresh Fruits — Price per kg</h3>
              {renderGridFrom(sampleFreshFruits)}
            </div>
          ) : slug === 'fruits-vegetables' && showSub === 'fresh-vegetables' ? (
            <div>
              <h3 style={{marginBottom:12}}>Fresh Vegetables — Price per kg</h3>
              {renderGridFrom(sampleFreshVegetables)}
            </div>
          ) : slug === 'dairy-eggs' && ((!showSub || showSub === 'all')) ? (
            <div>
              <h3 style={{marginBottom:12}}>Dairy & Eggs</h3>
              {renderGridFrom(sampleDairy)}
            </div>
          ) : slug === 'dairy-eggs' && showSub === 'milk' ? (
            <div>
              <h3 style={{marginBottom:12}}>Milk Products</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
                {sampleDairy.filter(p => p.id.includes('milk')).map(p => (
                  <div key={p.id} style={{padding:12,borderRadius:8,background:'#fff',border:'1px solid #eef2f7'}}>
                    <div style={{fontWeight:700}}>{p.name}</div>
                    <div style={{color:'#4b5563',marginTop:6}}>₹{p.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : slug === 'dairy-eggs' && showSub === 'eggs' ? (
            <div>
              <h3 style={{marginBottom:12}}>Eggs</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
                {sampleDairy.filter(p => p.id === 'eggs').map(p => (
                  <div key={p.id} style={{padding:12,borderRadius:8,background:'#fff',border:'1px solid #eef2f7'}}>
                    <div style={{fontWeight:700}}>{p.name}</div>
                    <div style={{color:'#4b5563',marginTop:6}}>₹{p.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : slug === 'bakery' && ((!showSub || showSub === 'all')) ? (
            <div>
              <h3 style={{marginBottom:12}}>Bakery</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
                {renderGridFrom(sampleBakery)}
              </div>
            </div>
          ) : slug === 'staples' && ((!showSub || showSub === 'all')) ? (
    <div>
        <h3 style={{marginBottom:12}}>Staples</h3>
        {/* CORRECTED: Use the reusable component function */}
        {renderGridFrom(sampleStaples)}
    </div>
          ) : slug === 'cooking-oils' && ((!showSub || showSub === 'all')) ? (
    <div>
        <h3 style={{marginBottom:12}}>Cooking Oils</h3>
        {/* CORRECTED: Use the reusable component function */}
        {renderGridFrom(sampleCookingOils)} 
    </div>
          // CORRECT code for 'snacks':

) : slug === 'snacks' && ((!showSub || showSub === 'all')) ? (
    <div>
        <h3 style={{marginBottom:12}}>Snacks</h3>
        {/* Call the reusable function that uses <ProductCard /> */}
        {renderGridFrom(sampleSnacks)} 
    </div>
) : ( 
            <div style={{padding:16,background:'#fff',border:'1px solid #eef2f7',borderRadius:8}}>
              <div style={{color:'#6b7280'}}>Select a subcategory to view items.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
