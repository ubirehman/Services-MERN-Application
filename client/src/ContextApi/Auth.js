import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    });

    axios.defaults.headers.common['Authorization'] = auth?.token;

    function loginUser() {
        const data = localStorage.getItem('auth');
        if (data) {
            const parsedData = JSON.parse(data);
            const { token, ...user } = parsedData;
            setAuth({...auth,
                user, token});
        }
    }
    useEffect(() => {
        loginUser();
    }, [])
    return (
        <authContext.Provider value={[auth, setAuth]}>
            {children}
        </authContext.Provider>
    )
}

const useAuth = () => useContext(authContext);

export { useAuth, AuthProvider };