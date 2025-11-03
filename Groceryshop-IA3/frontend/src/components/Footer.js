import React from 'react';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="inner">
        <div>© {new Date().getFullYear()} Grocery Store</div>
        <div>Built with ❤️ • Contact: support@grocery.com</div>
      </div>
    </footer>
  );
}
