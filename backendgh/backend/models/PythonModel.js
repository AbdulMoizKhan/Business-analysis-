class PythonModel {
    executeScript() {
      return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['python/AML.py']);
  
        let output = '';
        let error = '';
  
        pythonProcess.stdout.on('data', (data) => {
          output += data;
        });
  
        pythonProcess.stderr.on('data', (data) => {
          error += data;
        });
  
        pythonProcess.on('close', (code) => {
          if (code === 0) {
            resolve(output);
          } else {
            reject(error);
          }
        });
      });
    }
  }
  
  module.exports = PythonModel;
  