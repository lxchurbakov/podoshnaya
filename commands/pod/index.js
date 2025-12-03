// const vm = require('../vm');
const stpcp = require('../../modules/stpcp');
const remote = require('../remote');
const fs = require('fs');

const push = (origin, name, filename) => {
    const list = remote.list();
    const url = list[origin];

    if (!url) {
        throw new Error(`no origin ${origin}`);
    }

    const [host, port] = url.split(':');

    const client = stpcp.client(port, host);

    if (!client) {
         throw new Error(`cant establish connection with ${host}:${port}`);
    }

    // push our pod
    const content = fs.readFileSync(filename);

    client.write({ type: 'push', name, content });

    // client.on('data', console.log);

    // client.write('ping');
    // send ping
};

const start = (name) => {
    // todo origin
};

const stop = (name) => {
    // todo origin
};

const status = (name) => {
    // todo origin
};

const remove = (name) => {
    // todo origin
};

module.exports = { push, start, stop, status, remove };
