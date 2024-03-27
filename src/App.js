// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import Home from './components/Home';
import About from './components/About';
import Index from './components/Index';
import Login from './components/Login';
import Ticket from './components/Ticket';

const App = () => {
  return (
    <Router>
      <Routes> {/* Wrap your Routes with <Routes> */}
        <Route exact path="/" element={<Index />} /> {/* Use 'element' prop instead of 'component' */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
    </Router>
  );
};

export default App;