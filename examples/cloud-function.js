module.exports = async (req, res) => {
    // res.status(200);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.write('this is cloud function response');
    // res.end();
    res.end('this is cloud function response\n');
};

module.exports.path = '/cloud-function';
