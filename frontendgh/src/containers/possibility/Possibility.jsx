import React from 'react';
import axios from 'axios';
import possibilityImage from '../../assets/possibility.png';
import './possibility.css';

const handleButtonClick = () => {
  axios
    .get('http://localhost:3002/api/run_python_file')
    .then(() => {
      console.log('Python file executed successfully');
    })
    .catch((error) => {
      console.error('Error executing Python file:', error);
    });
};

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
      <div className="gpt3__header-content__input">
        <input type="Question" placeholder="What Business?" />
        <button type="button" onClick={handleButtonClick}>
          AI Prediction
        </button>
      </div>
      <div className="gpt3__possibility-content">
        <h1 className="gradient__text">Our AI Algorithm will suggest locations</h1>
        <div className="gpt3__header-content__input">
          <button type="button">Malir</button>
          <button type="button">Gulshan E Iqbal</button>
          <button type="button">FB Area</button>
        </div>
      </div>
      <div className="gpt3__possibility-content">
        <h1 className="gradient__text">AI Model will also tell success rate at that area</h1>
        <div className="gpt3__header-content__input">
          <button type="button">80%</button>
        </div>
      </div>
    </div>
  </div>
);

export default Possibility;
