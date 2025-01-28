import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
    user: any;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedUser = localStorage.getItem('user');
    const [user, setUser] = useState<any>(
        storedUser ? (storedUser !== 'undefined' ? JSON.parse(storedUser) : null) : null
    );
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const response = await axios.get('http://localhost:5001/api/users/me');
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                } catch (error) {
                    logout(); // Force logout on invalid token
                }
            }
        };
        verifyToken();
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:5001/api/users/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setUser(user);
            setToken(token);
        } catch (error) {
            throw new Error('Invalid login credentials');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
