import React, { useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';


const GraphData = () => {
  const [plotData, setPlotData] = useState(null);

      useEffect(() => {
        // Fetch the plot data from the API endpoint
        axios.get('http://localhost:3002/api/graph_data/:title', {
          responseType: 'arraybuffer'
        })
          .then((response) => {
            setPlotData(response.data);
          })
          .catch((error) => {
            console.error('Error retrieving plot data', error);
          });
      }, []);
   
  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};
export default GraphData
// useEffect(() => {
//   // Make a GET request to retrieve the plot data
//   axios.get('http://localhost:3000/api/graph_data/:title')
//     .then(response => {
//       // Handle the successful response
//       const plotData = response.data;
//       console.log(plotData);
//     })
//     .catch(error => {
//       // Handle the error
//       console.error(error);
//     });