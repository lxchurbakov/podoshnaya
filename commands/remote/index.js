// Store in app data
const appdata = require('../../modules/appdata');
const storage = appdata.request('remote-origins');

const update_config = (predicate) => {
    const config = storage.load('config', {});
    const new_config = predicate(config);

    storage.save('config', new_config);
};

const add = (name, url) => {
    update_config((config) => ({
        ...config, [name]: url
    }));
};

const list = () => {
    return storage.load('config', {});
};

const remove = (name) => {
    update_config((config) => {
        delete config[name];
        return config;
    });
};

module.exports = { add, list, remove };
