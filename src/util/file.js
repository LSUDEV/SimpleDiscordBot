let util = {};

const fs = require("fs/promises");

util.getFiles = async function(path, parent) {
    const entries = await fs.readdir(path, {
        withFileTypes: true
    });

    const folders = entries.filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
    const files = entries.filter((entry) => !entry.isDirectory())
        .map((entry) => parent ? `${parent}/${entry.name}` : entry.name);

    for (const folder of folders) {
        files.push(...await this.getFiles(`${path}/${folder}/`, folder));
    }
    return files;
}

util.registerFiles = async function(path) {
    let result = {};
    const files = await this.getFiles(path);

    for (const filePath of files) {
        const file = require(`${path}/${filePath}`);
        let fileName = filePath.split("/");
        fileName = fileName[fileName.length - 1];

        result[file.name ? file.name : fileName] = file;
    }
    return result;
}

module.exports = util;