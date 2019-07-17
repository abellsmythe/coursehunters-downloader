// Dependencies
const downloadFile = require('./download-file');
const createFile = require('./create-file');

const downloadFiles = async (destiny, files) => {
    for (const file of files) {
        const { name, url } = file;
        
        const filePath = `${destiny}/${name}`;
        const fileStream = createFile(filePath);

        await downloadFile(url, fileStream);
    }
};

module.exports = downloadFiles;