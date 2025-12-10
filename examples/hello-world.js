module.exports = async (...args) => {
    console.log('Hello world', ...args);

    return () => {
        console.log('cleanup');
    };
};
