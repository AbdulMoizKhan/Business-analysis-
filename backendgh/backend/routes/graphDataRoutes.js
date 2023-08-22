const express = require('express');
const { getGraphData } = require('../controllers/graphDataController');

const router = express.Router();

router.get('/:title', getGraphData);

module.exports = router;