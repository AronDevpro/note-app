// SessionContext.js
import {createContext, useState, useContext, useEffect} from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Retrieve user and token from localStorage when component mounts
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        // Save user and token to localStorage whenever they change
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }, [user, token]);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <SessionContext.Provider value={{ user, token, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);
