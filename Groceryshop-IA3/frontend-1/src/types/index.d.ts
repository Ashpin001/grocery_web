interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

interface User {
    id: string;
    username: string;
    email: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

export type { Product, CartItem, User, AuthContextType, ThemeContextType };