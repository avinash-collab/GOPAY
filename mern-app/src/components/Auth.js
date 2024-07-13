// src/components/Auth.js
import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'signup';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axios.post(`http://localhost:3000/api/${endpoint}`, payload);
      setMessage(`${isLogin ? 'Login' : 'Signup'} successful: ${response.data.message}`);
    } catch (error) {
      setMessage(`${isLogin ? 'Login' : 'Signup'} failed.`);
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>
      <form onSubmit={handleAuth} className="auth-form">
        {!isLogin && (
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default Auth;
