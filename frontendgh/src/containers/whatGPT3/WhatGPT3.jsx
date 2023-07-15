import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="App Overview" text="Our thought is that every enterprenuer should start what they think about and have success in it." />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
      <p>Explore the Library</p>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Data Analysis" text="App is designed to analyse data providedby user and server as well" />
      <Feature title="AI Modelling" text="AI Model is used to forecast success rate according to given parameters" />
    </div>
  </div>
);

export default WhatGPT3;
