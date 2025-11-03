import axios from 'axios';

const API_URL = Process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// Adjust the URL as needed
const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Function to fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
    }
};

// Function to fetch a single product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching product: ' + error.message);
    }
};

// Function to handle user authentication
export const authenticateUser = async (credentials: any) => {
    try {
        // backend exposes /api/users/login
        const response = await axios.post(`${API_URL}/users/login`, credentials);
        // store token/user in localStorage for later authenticated requests
        if (response.data?.token) localStorage.setItem('token', response.data.token);
        if (response.data?.user) localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error: any) {
        throw new Error('Error authenticating user: ' + (error.response?.data?.message || error.message));
    }
};

// Function to create a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, userData);
        if (response.data?.token) localStorage.setItem('token', response.data.token);
        if (response.data?.user) localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};

// alias expected by some components
export const loginUser = authenticateUser;

// Create an order. Expects orderPayload: { orderItems: [{ product: id, qty }], totalPrice }
export const createOrder = async (orderPayload: any) => {
    try {
        const token = localStorage.getItem('token');
        const headers: any = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const response = await axios.post(`${API_URL}/orders`, orderPayload, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error creating order: ' + (error.response?.data?.message || error.message));
    }
};