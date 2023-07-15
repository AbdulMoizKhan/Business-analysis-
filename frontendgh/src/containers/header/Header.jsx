import React, { useState } from 'react';
// import people from '../../assets/people.png';
import ai from '../../assets/dsimg.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Business Forcasting Using Data Analysis</h1>
      <p>This Application ensures the Forcasting of your business in a certain location of Pakistan by using Data Analysis and Artificial Intelligence.</p>
      <div className="gpt3__header-content__input">
        <input type="text" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>

      {/* <div className="gpt3__header-content__people">
        <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div> */}
    </div>

    <div className="gpt3__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
