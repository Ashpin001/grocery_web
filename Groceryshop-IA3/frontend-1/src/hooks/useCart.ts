import { useState, useEffect, useMemo } from 'react';

export const useCart = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (product: any) => {
        setCart((prevCart: any[]) => {
            const updatedCart = [...prevCart, product];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart: any[]) => {
            const updatedCart = prevCart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const savedCart = localStorage.getItem('cart');
            setCart(savedCart ? JSON.parse(savedCart) : []);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const totalAmount = useMemo(() => {
        return cart.reduce((sum: number, item: any) => sum + (item.price || 0), 0);
    }, [cart]);

    return {
        cartItems: cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalAmount,
    };
};

export default useCart;