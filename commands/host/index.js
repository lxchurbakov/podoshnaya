const net = require('net');
const appdata = require('../appdata');

const start = (port) => {
    const pods = appdata.request('pods/root');

    stpcp.create(port, (socket) => {
        // console.log('connected');

        socket.on('data', (data) => {
            if (data === 'ping') {
                socket.emit('data', 'pong');
            }
        }); 
        
        // 
        
        // socket.emit('close') -- to close ???
        // кажется кринж, нужно
        // socket.close()
        // плюс socket.on('close') тоже надо

        // socket.status ещё бы какой-нибудь


        // callback({ emit});


        
        // let code = '';

        // socket.on('data', (data) => {
        //     code += data.toString();
        // });
        
        // socket.on('end', () => {
        //     pods.save('pod', code);
        //     // console.log('run', { code })
        //     // Save and execute the received code
        //     // run(code).then((output) => {
        //     //     console.log({ output });
        //     // }).catch((err) => {
        //     //     console.error(error);
        //     // });
        //     // const filename = __dirname + '/' + `temp_${Date.now()}.js`;

        //     // fs.writeFileSync(filename, code);
            
        //     // exec(`node ${filename}`, (error, stdout, stderr) => {
        //     //   let result = '';
        //     //   if (error) result += `Error: ${error.message}\n`;
        //     //   if (stderr) result += `Stderr: ${stderr}\n`;
        //     //   if (stdout) result += `Output: ${stdout}\n`;
            
        //     //   socket.write(result);
        //     //   socket.end();
            
        //     //   // Clean up
        //     //   fs.unlinkSync(filename);
        //     // });
        // });

        // // on start we run them
        // // and the can create p8a's
    });

    // pods.save('pod', code);
};

module.exports = { start };
