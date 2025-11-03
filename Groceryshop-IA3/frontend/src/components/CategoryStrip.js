import React from 'react';
import CategoryCard from './CategoryCard';
import { Link } from 'react-router-dom';

const categories = [
  {title:'Fruits & Vegetables', image:'/images/apple.png', slug:'fruits-vegetables'},
  {title:'Dairy & Eggs', image:'/images/milk.png', slug:'dairy-eggs'},
  {title:'Bakery', image:'/images/bread.png', slug:'bakery'},
  {title:'Staples', image:'/images/staples.png', slug:'staples'},
  {title:'Snacks', image:'/images/snacks.png', slug:'snacks'},
  {title:'Cooking Oils', image:'/images/oil.png', slug:'cooking-oils'},
];

export default function CategoryStrip(){
  return (
    <div style={{background:'#f8fafc',padding:'18px 0'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 16px'}}>
        <div style={{display:'flex',gap:12,overflowX:'auto',paddingBottom:4}}>
          {categories.map((c)=> (
            <Link key={c.slug} to={`/category/${c.slug}`} style={{textDecoration:'none'}}>
              <CategoryCard title={c.title} image={c.image} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
