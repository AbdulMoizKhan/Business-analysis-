const mongoose = require('mongoose');

const outputSchema = new mongoose.Schema({
  Precision: Number,
  Recall: Number,
  'F1-Score': Number
});

const Output = mongoose.model('Output', outputSchema);

module.exports = Output;