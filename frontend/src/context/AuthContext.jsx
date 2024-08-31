import { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:8080/api/auth/login', { email, password });
        // const data = await res.json();
        console.log(res.data);
        setToken(res.data.token);
        setUser({ id: res.data.payload.user.id, role: res.data.payload.user.role });
    };

    const register = async (username, email, password, role) => {
        const res = await axios.post('http://localhost:8080/api/auth/register', { username, email, password, role });
        setToken(res.data.token);
        setUser({ id: res.data.user.id, role: res.data.user.role });
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
