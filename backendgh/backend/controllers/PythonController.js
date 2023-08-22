const { spawn } = require('child_process');

class PythonController {
  runPythonFile(req, res) {
    const pythonProcess = spawn('python', ['python/AML.py']);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error executing Python script: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        res.send('Python file executed successfully');
      } else {
        res.status(500).send('Error executing Python file');
      }
    });
  }
}

module.exports = PythonController;
