import React, { useState } from 'react';
import useAuth from '../contexts/authProvider';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useAuth();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password)
        
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
        <div className="text-center mt-2">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/register" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;