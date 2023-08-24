import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function Login({theme}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({ password: password }),
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log("login data",data);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container" id={theme}>
      <h1>Login</h1>
      <div className="login-form">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
