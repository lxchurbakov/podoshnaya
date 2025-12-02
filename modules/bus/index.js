// bus { emit, on }
const create = () => {
    let listeners = [];

    const on = (listener) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(($) => $ !== listener);
        };
    };

    const emit = (data) => {
        listeners.forEach(($) => $(data));
    };

    return { emit, on };
};

const named = (bus) => {
    const on = (name, listener) => {
        return bus.on((event) => {
            if (event.name === name || name === '*') {
                listener(event.data);
            }
        });
    };

    const emit = (name, data) => {
        return bus.emit({ name, data });
    };

    return { emit, on };
};

module.exports = { create, named };
