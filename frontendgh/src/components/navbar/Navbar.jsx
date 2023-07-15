import React from 'react';
import './navbar.css';

const Navbar = () => (
  <div className="gpt3__navbar">
    <div className="gpt3__navbar-links">
      <div className="gpt3__navbar-links_container">
        <p><a href="#home">Home</a></p>
        <p><a href="#wgpt3">AppOverview</a></p>
        <p><a href="#possibility">Questionaire</a></p>
        <p><a href="#blog">Result</a></p>
      </div>
    </div>
    <div className="gpt3__navbar-sign">
      <button type="button" className="sgn">Sign In</button>
      <button type="button">Sign up</button>
    </div>
  </div>
);

export default Navbar;
