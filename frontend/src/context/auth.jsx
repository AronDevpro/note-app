import {createContext, useState, useContext, useEffect} from 'react';

// SessionContext.js
const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user and token from localStorage when component mounts
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        // Save user and token to localStorage whenever they change
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <SessionContext.Provider value={{ user, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);
