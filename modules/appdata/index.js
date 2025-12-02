const fs = require('fs');
const path = require('path');

const WORKDIR = process.cwd();
const APPDIR = path.resolve(__dirname, '__data');

const request = (name) => {
    const dir = path.resolve(APPDIR, name);

    fs.mkdirSync(dir, { recursive: true });

    return {
        save: (name, blob) => {
            return fs.writeFileSync(path.resolve(dir, name), JSON.stringify(blob));
        },
        load: (name, d) => {
            try {
                return JSON.parse(fs.readFileSync(path.resolve(dir, name)));
            } catch (e) {
                return d;
            }
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
