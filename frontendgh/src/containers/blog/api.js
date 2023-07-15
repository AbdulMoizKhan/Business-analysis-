import axios from 'axios';

const API_URL = 'http://localhost:3002'; // Replace with your backend server URL

export async function getOutputs() {
  try {
    const response = await axios.get(`${API_URL}/outputs`);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line
    console.error('Error:', error);
    throw new Error('An error occurred');
  }
}
