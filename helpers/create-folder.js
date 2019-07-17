const fs = require('fs');
const chalk = require('chalk');

const createFolder = (path) => {
    // Verify if folder Exists
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        console.log(
            chalk.yellow('Create ' + path + ' Directory')
        );
    }
}

module.exports =  createFolder;