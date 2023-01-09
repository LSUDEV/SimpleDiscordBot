let manager = {};

const fs = require("fs/promises");

const file = require("../util/file");
const logger = require("../util/logger");

manager.commands = {};
manager.names = [];

manager.register = async function() {
    const commands = await file.registerFiles(`${__dirname}/impl/`);
    manager.commands = commands;
    manager.names = Object.keys(commands);
    logger.info(`Loaded ${Object.keys(commands).length} commmands!`);
}

module.exports = manager;