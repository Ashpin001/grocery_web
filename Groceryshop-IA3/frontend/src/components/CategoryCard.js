import React from 'react';

export default function CategoryCard({title, image}){
  return (
    <div style={{width:120,flex:'0 0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:8,padding:12,borderRadius:10,background:'#fff',boxShadow:'0 1px 4px rgba(15,23,42,0.04)'}}>
      <img src={image} alt={title} style={{width:56,height:56}} />
      <div style={{fontSize:13,color:'#0f172a',textAlign:'center'}}>{title}</div>
    </div>
  );
}
