const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
  title: String,
  plot: Buffer
});

const Plot = mongoose.model('graph_data', plotSchema);

module.exports = Plot;