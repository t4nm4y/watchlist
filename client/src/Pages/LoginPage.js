import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function Login({ theme }) {
  const [easterEgg, setEasteregg] = useState(false);
  const [easterEggInput, setEasterEggInput] = useState('');
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
        console.log("login data", data);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  function handleEasterEgg(e) {
    if (e.key === 'Enter' && easterEggInput === process.env.REACT_APP_EASTEREGG) {
      console.log("Easter egg activated")
      setEasteregg(true);
    }
  }

  return (
    <div className="login-container" id={theme}>
      {!easterEgg ? (
        <>
          <h1 style={{ padding: '0.5em' }}>Only I have the access to edit the content!</h1>
          <input autoFocus onKeyUp={handleEasterEgg} style={{ opacity: 0 }}
          onChange={(e) => setEasterEggInput(e.target.value)}
          />
        </>
      ) : (
        <>
          <h1>Login</h1>
          <div className="login-form">
            <input type="password" placeholder="Password" value={password} autoFocus
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
