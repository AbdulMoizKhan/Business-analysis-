import React, { useState, useEffect } from 'react';
import './blog.css';
import axios from 'axios';
import { getOutputs } from './api.js';

function Blog() {
  const [outputs, setOutputs] = useState([]);
  const [plotData, setPlotData] = useState(null);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/png;base64,${window.btoa(binary)}`;
  };

  const handleButtonClick = (title) => {
    axios
      .get(`http://localhost:3002/api/graph_data/${title}`, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        const imageSrc = arrayBufferToBase64(response.data);
        setPlotData(imageSrc);
      })
      .catch((error) => {
        console.error('Error retrieving plot data', error);
      });
  };
  async function fetchOutputs() {
    try {
      const fetchedOutputs = await getOutputs();
      console.log('Fetched outputs:', fetchedOutputs); // Debugging statement
      setOutputs(fetchedOutputs);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  function renderOutputs() {
    const filteredOutputs = outputs.filter((output) => output._id !== undefined);
    return filteredOutputs.map((output, index) => {
      const outputItems = Object.entries(output)
        .filter(([key]) => key !== '_id')
        .map(([key, value]) => (
          <li className="white" key={key}>
            {key}: {typeof value === 'number' ? `${(value * 100).toFixed(2)}%` : value}
          </li>
        ));
      return <ul key={index}>{outputItems}</ul>;
    });
  }
  useEffect(() => {
    // Fetch outputs when the component mounts
    fetchOutputs();
  }, []);
  return (
    <div className="gpt3__blog section__padding" id="blog">
      <div className="gpt3__blog-heading">
        <div>
          <h1 className="white">Plot Data</h1>

          <button type="button" onClick={() => handleButtonClick('Accuracy_of_Dummy_Model')}>
            Accuracy_of_Dummy_Model
          </button>

          <button type="button" onClick={() => handleButtonClick('Distribution_of_Age')}>
            Distribution_of_Age
          </button>

          <button type="button" onClick={() => handleButtonClick('Distribution_of_Avg_Annual_Growth')}>
            Distribution_of_Avg_Annual_Growth
          </button>

          <button type="button" onClick={() => handleButtonClick('Pairwise Scatter Plots')}>
            Distribution_By_Key_Parameters
          </button>

          <button type="button" onClick={() => handleButtonClick('Average Values of Numerical Variables')}> Avg_Values_Of_Numerical_Variables  </button>
          <button type="button" onClick={() => handleButtonClick('Average_Values_of_Numerical_Variables_by_Division')}>
            Avg_Values_Of_Numerical_Variables_By_Division
          </button>

          <button type="button" onClick={() => handleButtonClick('Average Annual Growth by Division')}>
            Avg_Annual_Growth_By_Division
          </button>

          <div>{plotData && <img src={plotData} alt="Plot" />}</div>
        </div>
      </div>
      <div className="gpt3__blog-container">
        <div className="gpt3__blog-container_groupA">
          <div>
            <h1 className="white">Success Rate Of Business</h1>
            <p className="white">Prediction of AI model Will Give You Results On Negative Scale of that Area</p>
            <ul>
              {renderOutputs(outputs)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
