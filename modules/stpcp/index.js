// Simple T(CP) Process Communication Protocol
// creates a server above TCP connection
const net = require('net');
const bus = require('../bus');

const server = (port, callback) => {
    // take tcp server
    // forward on connect
    // return emit/on? 
    // emit to broadcast
    const server = net.createServer((socket) => {
        const { emit, on } = bus.named(bus.create());

        socket.on('data', (data) => {
            emit('data', JSON.parse(data));
        });

        socket.on('end', () => {
            emit('close');
        });

        const close = () => {
            socket.destroy();
        };

        const write = (data) => {
            socket.write(JSON.stringify(data));
        };

        callback({ write, on, close });
    });

    server.listen(port, () => {
        // TODO change
        console.log(`Execution server listening on port ${port}`);
    });
};

const client = (port, host) => {
    const socket = new net.Socket();

    const { emit, on } = bus.named(bus.create());

    socket.connect(port, host, () => {
        socket.on('data', (data) => {
            emit('data', JSON.parse(data));
        });

        socket.on('close', () => {
            emit('close');
        });
    });

    const close = () => {
        socket.destroy();
    };

    const write = (data) => {
        socket.write(JSON.stringify(data));
    };

    return { close, on, write }
};

const call = (s, name, ...args) => {
    const id = Math.random();

    return new Promise((resolve, reject) => {
        s.on('data', (m) => {
            if (m.type === `vf/${name}/resolve` && m.id === id) {
                resolve(m.result);
            }

            if (m.type === `vf/${name}/reject` && m.id === id) {
                reject(m.error);
            }
        });

        s.write({ type: `vf/${name}/call`, args, id });
    });
    
};

const register = (s, name, predicate) => {
    s.on('data', (m) => {
        if (m.type === `vf/${name}/call`) {
            Promise.resolve(predicate(...m.args))
                .then((result) => s.write({ type: `vf/${name}/resolve`, result, id: m.id }))
                .catch((error) => s.write({ type: `vf/${name}/reject`, error: String(error), id: m.id }));
        }
    });
};

module.exports = { server, client, call, register };


// const net = require('net');
// const fs = require('fs');



// client.connect(3000, 'localhost', () => {
//   const filename = process.argv[2];
//   if (!filename) {
//     console.log('Usage: node client.js <filename.js>');
//     process.exit(1);
//   }
//   console.log('send', filename)
  
//   const code = fs.readFileSync(filename, 'utf8');

//   console.log({ code })

//   client.write(code);
//   client.end();
// });
