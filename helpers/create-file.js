const fs = require('fs');

const createFile = (path) =>
    fs.createWriteStream(path);

module.exports = createFile;
