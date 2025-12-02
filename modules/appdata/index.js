const fs = require('fs');
const path = require('path');

const WORKDIR = process.cwd();
const APPDIR = path.resolve(WORKDIR, '__data');

const request = (name) => {
    const dir = path.resolve(APPDIR, name);

    fs.mkdirSync(dir, { recursive: true });

    return {
        save: (name, blob) => {
            return fs.writeFileSync(path.resolve(dir, name), blob);
        },
        load: (name) => {
            return fs.readFileSync(path.resolve(dir, name));
        },
        has: (name) => {
            return fs.statSync(path.resolve(dir, name)).isFile();
        },
        remove: (name) => {
            return fs.unlinkSync(path.resolve(dir, name));
        },
    };
};

module.exports = { request };
