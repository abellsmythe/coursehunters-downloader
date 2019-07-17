const https = require('https');
const chalk = require('chalk');
// https://www.npmjs.com/package/cli-progress

const downloadFile = (url, file) => {
    console.log(
        chalk.white(`Start downloading from ${url}`)
    );

    return new Promise((resolve) => {
        https.get(url, function (res) {
            res.pipe(file)
                .on('end', function () {
                    console.log(
                        chalk.white.bold(`File from ${url} downloaded`)
                    );
                    resolve();
                });
        });
    });
};

module.exports = downloadFile;