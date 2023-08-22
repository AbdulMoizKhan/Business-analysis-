const Output = require('../models/output');

function getOutputs(_, res) {
  Output.find()
    .then(outputs => {
      res.json(outputs);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    });
}

module.exports = {
  getOutputs
};