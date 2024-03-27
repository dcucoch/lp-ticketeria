// src/components/About.js
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      {/* Add any content for the About page */}
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default About;