#!/usr/bin/env node

// Dependencies
const { JSDOM } = require('jsdom');
const minimist = require('minimist');
const chalk = require('chalk');

const createFolder = require('./helpers/create-folder');
const downloadFiles = require('./helpers/download-files');
const getContentFromUrl = require('./helpers/get-content-from-url');

const src = "./courses";
const baseUrl = "https://coursehunters.net/course/";

const init = () => {
    console.log(
      chalk.green('Running CourseHunters Downloader')
    );
}

const success = (msg) => {
    console.log(
      chalk.green(`Done! ${msg}`)
    );
};

const run = async () => {
    // show script introduction
    init();

    // Create General Courses folder if doesn't exists
    createFolder(src);

    // Get arguments
    const args = minimist(process.argv.slice(2));
    if(!args.course) return;

    // Get Content of the Course
    const courseUrl = `${baseUrl}${args.course}`;
    const contentUrl = await getContentFromUrl(courseUrl);
        
    // Get Dom
    const dom = await new JSDOM(contentUrl);

    // Data
    const title = dom.window.document.querySelector('.hero-title').innerHTML;
    const videos =
        Array.from(
            dom.window.document.querySelectorAll("ul.lessons-list li.lessons-item")
        ).map(video => {
            return ({
                name: video.childNodes[3].innerHTML,
                url: video.childNodes[13].getAttribute('href'),
            })
        });

    // Create Course Folder
    const destiny = `${src}/${title.toLowerCase()}`;
    createFolder(destiny);

    // Download File
    await downloadFiles(destiny, videos);

    // show success message
    success(`Course ${args.course} downloaded`);
};

run();
