import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQty } = useCart();
  const total = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 0), 0);
  const [address, setAddress] = useState({ name: 'Karunya university', postalCode: '641114' });
  const priceSum = cart.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);
  // For legacy CRA we don't have originalPrice in data; assume a productDiscount field or 0
  const productDiscount = cart.reduce((s, it) => s + (it.originalPrice ? (it.originalPrice - it.price) * (it.qty || 1) : 0), 0);
  const platformFee = Math.round(priceSum * 0.02);
  const totalAmount = priceSum - productDiscount + platformFee;
  const [toast, setToast] = useState('');

  const createOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) { setToast('Please login before placing an order'); return; }
    const orderItems = cart.map(it => ({ product: it._id || it.id, qty: it.qty || 1 }));
    const payload = { orderItems, totalPrice: totalAmount, shippingAddress: { name: address.name, postalCode: address.postalCode } };
    try {
      // Use explicit backend URL to avoid dev-server proxy issues
      const res = await fetch('http://localhost:5000/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
      if (!res.ok) { const err = await res.json(); setToast(err.message || 'Order failed'); return; }
      setToast('youre order placed successfully!!!');
      // optionally clear cart here by calling a context method if available
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
      setToast('Network error while placing order');
    }
    // hide toast after 4s
    setTimeout(() => setToast(''), 4000);
  };

  return (
    <div className="container">
      <h2 className="page-title">Cart</h2>
      {cart.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, background: '#f8f8f8', padding: 8, borderRadius: 6 }}>
          <div>
            <strong>Deliver to:</strong>&nbsp;
            <span>{address?.name || 'Karunya university'} - {address?.postalCode || '641114'}</span>
          </div>
          <div>
            <button onClick={() => {
              const newAddr = window.prompt('Enter delivery address (e.g. Karunya university - 641114)', `${address?.name || 'Karunya university'} - ${address?.postalCode || '641114'}`);
              if (newAddr) {
                // simple parse: split by '-' to get name and code
                const parts = newAddr.split('-').map(p => p.trim());
                setAddress({ name: parts[0] || 'Karunya university', postalCode: parts[1] || '641114' });
              }
            }}>Change</button>
          </div>
        </div>
      )}
      {!cart.length ? (
        <p>Cart empty</p>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {/* Price details block */}
          <div style={{ padding: 12, background: '#fff', borderRadius: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', maxWidth: 360 }}>
            <h3>PRICE DETAILS</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Price ({cart.length} item{cart.length>1?'s':''})</span>
              <span>₹{priceSum.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: productDiscount>0 ? 'green' : undefined }}>
              <span>Product Discount</span>
              <span>- ₹{productDiscount.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Platform Fee</span>
              <span>₹{platformFee.toFixed(2)}</span>
            </div>
            <hr style={{ margin: '8px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            {productDiscount>0 && <div style={{ marginTop: 8, color: 'green' }}>You will save ₹{productDiscount.toFixed(2)} on this order</div>}
          </div>
          {cart.map((it) => (
            <div key={it._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <img src={it.image || '/placeholder.png'} alt={it.name} style={{ width: 64, height: 64, objectFit: 'contain' }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{it.name}</div>
                  <div style={{ color: '#6b7280' }}>₹{(it.price ?? 0).toFixed(2)}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="number" min="1" value={it.qty} onChange={(e) => updateQty(it._id, Number(e.target.value) || 1)} style={{ width: 72, padding: 6 }} />
                <div style={{ fontWeight: 700 }}>₹{(((it.price||0) * it.qty)).toFixed(2)}</div>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'right', fontWeight: 700 }}>Total: ₹{total.toFixed(2)}</div>
          <div style={{ textAlign: 'right', marginTop: 8 }}>
            <button className="btn" onClick={createOrder}>Place Order</button>
          </div>
          {toast && (
            <div style={{ position: 'fixed', right: 20, bottom: 20, background: '#111827', color: 'white', padding: 12, borderRadius: 6 }}>{toast}</div>
          )}
        </div>
      )}
    </div>
  );
}
