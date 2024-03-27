// src/components/Index.js
import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <h1>Index Page</h1>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/ticket">Ticket</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
//          <li>
//<Link to="/home">Home</Link>
//</li>
export default Index;