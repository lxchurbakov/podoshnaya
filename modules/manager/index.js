// start pods that need to be started
// keep track of status here
const appdata = require('../appdata');
const pods = appdata.request('pods/root');

// TODO rename to pods
const modules = {};

const parse = (code) => {
    // Create a mock module object
    const module = { exports: {} };

    // Evaluate the code
    new Function('module', 'require', code)(module, require);

    return module.exports;
};

// TODO make it all async
module.exports = {
    push: async (name, content) => {
        pods.save(name, content);
        modules[name] = { status: 'idle' };
    },
    start: async (name) => {
        const content = pods.load(name);

        if (!content) {
            throw new Error('pod_not_found');
        }

        const params = 'params'; // TODO run params ????
        const bus = 'bus'; // TODO plugware
        const p8a = 'p8a'; // TODO host ???

        const runner = parse(content);

        try {
            const cleanup = await runner(params, bus, p8a);

            modules[name] = { status: 'up', cleanup };
        } catch (error) {
            modules[name] = { status: 'error', cleanup, error };
        }

        // console.log('start', content);

        // start in an environment
        // and store somewhere to stop
        // when run add args
        // params (HOW ???)
        // bus (for plugware)
        // and p8a so it can run virtual p8a
        // which is fucking wild
        // console.log('start', name);
    },
    stop: async (name) => {
        if (!modules[name]) {
            // TODO rename to pods
            throw new Error('module_not_found');
        }

        const { cleanup, status } = modules[name];

        if (status !== 'up') {
            throw new Error('modue_not_up');
        }

        try {
            await cleanup();
            modules[name] = { status: 'idle' };
        } catch (error) {
            modules[name] = { status: 'error', cleanup, error };
        }
    },
    status: async (name) => {
        // get status in VM
        // console.log('status', name);
        return modules[name]?.status ?? null;
    },
    remove: (name) => {
         if (!modules[name]) {
            // TODO rename to pods
            throw new Error('module_not_found');
        }

        const { status } = modules[name];

        if (status !== 'idle') {
            throw new Error('module_not_idle');
        }

        pods.remove(name);
        // stop the pod
        // remove from app data
        // console.log('remove', name);
    },
};