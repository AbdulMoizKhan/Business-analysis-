const express = require('express');
const graphDataRoutes = require('./routes/graphDataRoutes');
const connectDB = require('./config/config');
const outputRoutes = require('./routes/outputRoutes');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const app = express();

app.use(express.json());

// Connect to MongoDB
connectDB();

app.use(cors());
app.use('/api/graph_data', graphDataRoutes);
app.use('/', outputRoutes);
// app.use('/api/AML', myScriptRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});