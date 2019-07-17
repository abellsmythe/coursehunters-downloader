const https = require('https');
const chalk = require('chalk');
// https://www.npmjs.com/package/cli-progress

const downloadFile = async (url, file) =>    
    new Promise((resolve) => {
        console.log(
            chalk.white(`Start downloading from ${url}`)
        );
        https.get(url, function (res) {
            res.pipe(file)
                .on('finish', function () {
                    console.log(
                        chalk.white.bold(`File from ${url} downloaded`)
                    );
                    resolve();
                });
        });
    });

module.exports = downloadFile;