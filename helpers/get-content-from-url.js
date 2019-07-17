const https = require('https');

const getContentFromUrl = (url) =>
    new Promise((resolve, reject) => {
        https.get(url, function (res) {
            let data = '';
            res.on('data', function (chunk) {
                    data += chunk;
                })
                .on('end', function () {
                    resolve(data)
                });
        });
    });

module.exports = getContentFromUrl;