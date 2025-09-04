import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AUTH_ENDPOINTS } from '../utils/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set token in localStorage and axios headers when it changes
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }

        // Verify token and set user if valid
        const verifyToken = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(AUTH_ENDPOINTS.VERIFY);
                setUser(response.data.user);
            } catch (error) {
                console.error('Token verification failed:', error);
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(AUTH_ENDPOINTS.SIGNIN, {
                email,
                password
            });

            const { token: newToken, user: userData } = response.data;
            setToken(newToken);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(AUTH_ENDPOINTS.SIGNUP, {
                name,
                email,
                password
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};