const net = require('net');
const appdata = require('../appdata');

const start = (port) => {
    const pods = appdata.request('pods/root');

    const server = net.createServer((socket) => {
        console.log('Client connected');
        
        let code = '';

        socket.on('data', (data) => {
            code += data.toString();
        });
        
        socket.on('end', () => {
            pods.save('pod', code);
            // console.log('run', { code })
            // Save and execute the received code
            // run(code).then((output) => {
            //     console.log({ output });
            // }).catch((err) => {
            //     console.error(error);
            // });
            // const filename = __dirname + '/' + `temp_${Date.now()}.js`;

            // fs.writeFileSync(filename, code);
            
            // exec(`node ${filename}`, (error, stdout, stderr) => {
            //   let result = '';
            //   if (error) result += `Error: ${error.message}\n`;
            //   if (stderr) result += `Stderr: ${stderr}\n`;
            //   if (stdout) result += `Output: ${stdout}\n`;
            
            //   socket.write(result);
            //   socket.end();
            
            //   // Clean up
            //   fs.unlinkSync(filename);
            // });
        });

        // on start we run them
        // and the can create p8a's
    });

    server.listen(port, () => {
        console.log(`Execution server listening on port ${port}`);
    });
};

module.exports = { start };
