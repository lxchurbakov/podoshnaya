const start = (name, pod) => {
    return null;
};

const stop = (name) => {
    return null;
};

const status = (name) => {
    return null;
};

module.exports = { start, stop, status };


const vm = require('vm');

// TODO use stpcp

const run = async (code) => {
    try {
      // Capture console.log output
      let output = '';

      const context = {
        console: {
          log: (...args) => {
            output += args.join(' ') + '\n';
          }
        }
      };

      vm.createContext(context);
      
      // Execute the code
      vm.runInContext(code, context);
      
    //   socket.write
        return Promise.resolve(output || 'Code executed (no output)');
    } catch (error) {
    //   socket.write(`Error: ${error.message}`);
        return Promise.reject(error);
    }
};
