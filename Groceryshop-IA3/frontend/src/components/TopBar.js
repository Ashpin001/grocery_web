import React from 'react';
import { Link } from 'react-router-dom';

export default function TopBar(){
  return (
    <div style={{background:'#fff', borderBottom:'1px solid #eef2f7'}}>
      <div style={{maxWidth:1200, margin:'0 auto', padding:'10px 16px', display:'flex', alignItems:'center', gap:16}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{fontWeight:700,color:'#0f172a'}}>SPAR</div>
          <div style={{color:'#6b7280'}}>Current Location ▾</div>
        </div>
        <div style={{flex:1}}>
          <input placeholder="Search for products, categories..." style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #e6edf3'}} />
        </div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
