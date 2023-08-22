const express = require('express');
const outputController = require('../controllers/outputController');

const router = express.Router();

router.get('/outputs', outputController.getOutputs);

module.exports = router;