const express = require('express');
const PythonController = require('../controllers/PythonController');

const router = express.Router();
const pythonController = new PythonController();

router.get('/run_python_file', pythonController.runPythonFile);

module.exports = router;
