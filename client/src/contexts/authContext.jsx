import { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage synchronously to avoid redirect issues
  const storedUser = localStorage.getItem('CAPP-USER');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);

  // Use VITE_SERVER_URL for Vite projects
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const login = (email, password) => {
    axios
      .post(`${SERVER_URL}/api/login`, { email, password })
      .then((response) => {
        setUser(response.data.user);
        console.log('Login successful:', response.data.user);
        localStorage.setItem('CAPP-USER', JSON.stringify(response.data.user));
        setIsLoggedIn(true);
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Login failed:', error);
        // Optionally show error message to user
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('CAPP-USER');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;