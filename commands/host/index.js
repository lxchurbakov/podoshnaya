const manager = require('../../modules/manager');
const stpcp = require('../../modules/stpcp');

const start = (port) => {
    // Start the server
    // TODO make into rpc config module
    // merge server and register
    stpcp.server(port, (socket) => {
        stpcp.register(socket, 'push', (name, content) => {
            return manager.push(name, content);
        });

        stpcp.register(socket, 'start', async (name) => {
            return manager.start(name);
        });

        stpcp.register(socket, 'stop', async (name) => {
            return manager.stop(name);
        });

        stpcp.register(socket, 'status', async (name) => {
            return manager.status(name);
        });

        stpcp.register(socket, 'remove', async (name) => {
            return manager.remove(name);
        });
        
        // console.log('client connected', socket);
        // TODO resolve/reject handling
        // TODO this needs to be done one abstraction on top of it
        socket.on('data', async (data) => {
            // if (data?.type === 'push') {
            //     const { name, content } = data;

            //     manager.push(name, content);
            // }

            // if (data?.type === 'start') {
            //     const { name } = data;

            //     manager.start(name);
            // }

            // if (data?.type === 'stop') {
            //     const { name } = data;

            //     manager.stop(name);
            // }

            // if (data?.type === 'status') {
            //     const { name } = data;
            //     const status = manager.status(name);

            //     socket.write({ type: 'status', name, status });
            // }

            if (data?.type === 'remove') {
                const { name } = data;

                manager.remove(name);
            }
        });

        // socket.on('close', () => {
        //     console.log('client disconnected', socket);
        // });
    });
};

module.exports = { start };
