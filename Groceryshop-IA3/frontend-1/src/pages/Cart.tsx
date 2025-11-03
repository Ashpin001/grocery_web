import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { createOrder } from '../api/api';
import Button from '../components/ui/Button';
import './Cart.css'; // Optional styles

type Address = {
    name: string;
    street: string;
    city: string;
    postalCode: string;
    phone?: string;
};

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, clearCart, totalAmount } = useCart();
    const [showAddressForm, setShowAddressForm] = useState(false);
    const defaultAddress: Address = { name: 'Karunya university', street: '', city: '', postalCode: '641114' };
    const [address, setAddress] = useState<Address | null>(defaultAddress);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [createdOrder, setCreatedOrder] = useState<any>(null);

    // price calculations for summary / footer
    const priceSum = cartItems.reduce((s: number, it: any) => s + (Number(it.price) || 0) * (it.quantity || it.qty || 1), 0);
    const productDiscount = cartItems.reduce((s: number, it: any) => s + (Number(it.originalPrice ? (it.originalPrice - it.price) * (it.quantity || it.qty || 1) : 0) || 0), 0);
    const platformFee = Math.round(priceSum * 0.02);
    const orderTotal = priceSum - productDiscount + platformFee;

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) return;
        // Ensure user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login before placing an order');
            // navigate to login page if you have routing (optional)
            window.location.href = '/auth';
            return;
        }

        // build orderItems for backend
        const orderItems = cartItems.map((it: any) => ({
            product: it.id || it._id || (it.product && it.product.id) || it.product,
            qty: it.quantity || it.qty || 1,
            name: it.name,
            price: Number(it.price) || 0
        }));

        const payload = { orderItems, totalPrice: Number(orderTotal), shippingAddress: address };

        try {
            const created = await createOrder(payload);
            setCreatedOrder(created);
            setOrderPlaced(true);
            // clear cart so backend and UI stay in sync
            clearCart();
        } catch (err: any) {
            console.error('Order creation failed', err);
            alert(err.message || 'Network error while placing order');
        }
    };

    const handleAddressChange = (field: keyof Address, value: string) => {
        setAddress((prev: Address | null) => ({ ...(prev || {}), [field]: value } as Address));
    };

    const handleSubmitAddress = (e: React.FormEvent) => {
        e.preventDefault();
        (async () => {
            try {
                // build orderItems: map cartItems to { product: id, qty: 1 }
                const orderItems = cartItems.map((it: any) => ({ product: it.id || it._id || (it.product && it.product.id) || it.product, qty: it.quantity || it.qty || 1 }));
                const payload = { orderItems, totalPrice: Number(orderTotal), shippingAddress: address };
                const created = await createOrder(payload);
                setCreatedOrder(created);
                setOrderPlaced(true);
                setShowAddressForm(false);
            } catch (err: any) {
                console.error('Order creation failed', err);
                alert(err.message || 'Order creation failed');
            }
        })();
    };

    const handleFinish = () => {
        clearCart();
        setOrderPlaced(false);
        setAddress(null);
    };

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>

            {cartItems.length === 0 && !orderPlaced && (
                <p>Your cart is empty. Start adding some products!</p>
            )}

            {cartItems.length > 0 && !orderPlaced && (
                <>
                    <div className="deliver-to" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, background: '#f8f8f8', padding: '8px 12px', borderRadius: 6 }}>
                        <div>
                            <strong>Deliver to:</strong>&nbsp;
                            <span>{address ? `${address.name} - ${address.postalCode}` : 'Karunya university - 641114'}</span>
                        </div>
                        <div>
                            <Button onClick={() => setShowAddressForm(true)}>Change</Button>
                        </div>
                    </div>
                    <div className="cart-items">
                        {cartItems.map((item: any) => (
                            <div key={item.id} className="cart-item card">
                                <h2>{item.name}</h2>
                                <p>Price: ${Number(item.price).toFixed(2)}</p>
                                <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
                            </div>
                        ))}
                    </div>
                    {/* Price details box */}
                    <div className="price-details card" style={{ marginTop: 12, padding: 12, maxWidth: 360 }}>
                        <h3>PRICE DETAILS</h3>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Price ({cartItems.length} item{cartItems.length>1?'s':''})</span>
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
                                <span>₹{orderTotal.toFixed(2)}</span>
                            </div>
                            {productDiscount>0 && <div style={{ marginTop: 8, color: 'green' }}>You will save ₹{productDiscount.toFixed(2)} on this order</div>}
                        </div>
                    </div>

                    {/* Footer with total and Place Order near total */}
                    <div className="cart-footer" style={{ position: 'sticky', bottom: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, marginTop: 12, padding: '12px 0', background: 'white' }}>
                        <div style={{ fontWeight: 700 }}>Total: ₹{orderTotal.toFixed(2)}</div>
                        <Button onClick={handlePlaceOrder}>Place Order</Button>
                    </div>
                </>
            )}

            {showAddressForm && (
                <div className="address-form">
                    <h2>Enter delivery address</h2>
                    <form onSubmit={handleSubmitAddress}>
                        <div>
                            <label>Name</label>
                            <input required value={address?.name || ''} onChange={e => handleAddressChange('name', e.target.value)} />
                        </div>
                        <div>
                            <label>Street</label>
                            <input required value={address?.street || ''} onChange={e => handleAddressChange('street', e.target.value)} />
                        </div>
                        <div>
                            <label>City</label>
                            <input required value={address?.city || ''} onChange={e => handleAddressChange('city', e.target.value)} />
                        </div>
                        <div>
                            <label>Postal Code</label>
                            <input required value={address?.postalCode || ''} onChange={e => handleAddressChange('postalCode', e.target.value)} />
                        </div>
                        <div>
                            <label>Phone (optional)</label>
                            <input value={address?.phone || ''} onChange={e => handleAddressChange('phone', e.target.value)} />
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <Button type="submit">Confirm Address & Place Order</Button>
                            <Button onClick={() => setShowAddressForm(false)}>Cancel</Button>
                        </div>
                    </form>
                </div>
            )}

            {orderPlaced && (
                <div className="order-confirmation" style={{ padding: 24, textAlign: 'center' }}>
                    <h2>youre order placed successfully!!!</h2>
                    <div style={{ marginTop: 16 }}>
                        <Button onClick={handleFinish}>Done</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;