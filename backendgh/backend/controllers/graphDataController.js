const Plot = require('../models/plot');

const getGraphData = async (req, res) => {
  try {
    const plot = await Plot.findOne({ title: req.params.title });

    if (!plot) {
      return res.status(404).send('Plot not found');
    }

    res.send(plot.plot);
  } catch (error) {
    console.error('Error retrieving plot', error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getGraphData
};