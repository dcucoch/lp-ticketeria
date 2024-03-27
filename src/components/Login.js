import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate
import './Login.css'; // Importing CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Using useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace the URL with your backend endpoint
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/dashboard'); // Using navigate function for navigation
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p> {/* Link to the signup page */}
    </div>
  );
};

export default Login;
