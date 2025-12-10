// const vm = require('../vm');
const stpcp = require('../../modules/stpcp');
const remote = require('../remote');
const fs = require('fs');

//
const connect = (origin) => {
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

    client.on('data', console.log);

    return client;
};

const push = (origin, name, filename) => {
    const client = connect(origin);
    const content = fs.readFileSync(filename);

    stpcp.call(client, 'push', name, String(content)).then((result) => {
        console.log('PUSHED', result);
    }).catch((error) => {
        console.log('FAILED', error);
    });

    // client.write({ type: 'push', name, content });
    // console.log('we did send. whatever happens next we have no idea');
};

const start = (origin, name) => {
    const client = connect(origin);
    // const content = fs.readFileSync(filename);

    // client.write({ type: 'start', name });
    // console.log('we did send start. whatever happens next we have no idea');

    stpcp.call(client, 'start', name).then((result) => {
        console.log('STARTED', result);
    }).catch((error) => {
        console.log('FAILED', error);
    });
};

const stop = (origin, name) => {
    // todo origin
    const client = connect(origin);
    // const content = fs.readFileSync(filename);

    stpcp.call(client, 'stop', name).then((result) => {
        console.log('STOPPED', result);
    }).catch((error) => {
        console.log('FAILED', error);
    });

    // client.write({ type: 'stop', name });
    // console.log('we did send stop. whatever happens next we have no idea');
};

const status = (origin, name) => {
    // todo origin
    const client = connect(origin);
    // const content = fs.readFileSync(filename);

    stpcp.call(client, 'status', name).then((result) => {
        console.log('STATUS IS', result);
    }).catch((error) => {
        console.log('STATUS FETCH FAILED', error);
    });

    // client.write({ type: 'status', name });
    // console.log('we did send status. whatever happens next we have no idea');
    // STOP CONNECTION?
};

const remove = (origin, name) => {
    // todo origin
    const client = connect(origin);
    // const content = fs.readFileSync(filename);

    stpcp.call(client, 'remove', name).then((result) => {
        console.log('REMOVED', result);
    }).catch((error) => {
        console.error(error);
        console.log('REMOVE FAILED', error);
    });

    // client.write({ type: 'remove', name });
    // console.log('we did send remove. whatever happens next we have no idea');
};

module.exports = { push, start, stop, status, remove };
