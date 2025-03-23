import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


//Defined AuthContext Type
interface AuthContextType {
    user: any;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Use environment variable as base URL; fallback to localhost
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    //Load the User from local storage when app initializes
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setUser(null);
                setIsLoading(false);
                return;
            }
            
            try {
                const response = await axios.get(`${baseURL}/api/users/me`, {
                    headers: { Authorization: `Bearer ${token}`},
                });

                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
            } catch (error){
                console.error('Token verification failed:', error);
                logout(); // Force logout on invalid token
            } finally {
                setIsLoading(false);
            }
        };
        verifyToken();
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${baseURL}/api/users/login`, { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setToken(token);
            setUser(user);
        } catch (error) {
            throw new Error('Invalid login credentials');
        }
    };

    //Logout Functionality
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.clear();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, logout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

//Custom hook to use AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
