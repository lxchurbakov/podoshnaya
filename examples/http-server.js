const http = require('http');

module.exports = async (params, bus, p8a) => {
    // create virtua host
    // and accept pods that will
    // run inside this app
    // we need to manage them ourselves
    p8a({
        push: async (name, content) => {
            // save to parent appdata ???
            // we need access to parent appdata
            // and some kind of subroot
        },
        start: async (name) => {
            // start in this context means we will include
            // them in routing, but at what route?
            // maybe take module.exports.route
            // but to run it we need VM too
        },
        stop: async (name) => {
            // start them and add them to 
        },
        status: async (name) => {
            // start them and add them to 
        },
        remove: async (name) => {
            // start them and add them to 
        },
        // start, stop, status, remove
    });


    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!\n');
    });

    const PORT = 8080;

    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });

    return () => {
        server.close(() => {
            console.log('Server stopped');
        });
    };
};
