import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../Components/Utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            setAuthToken(token);
            setUser({ name: 'Admin' }); // Optionally fetch user info
        } else {
            setUser(null);
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await api.post('/login', { email, password });
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            setAuthToken(res.data.token);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Login failed' };
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch {}
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
