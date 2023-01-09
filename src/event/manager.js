let manager = {};

const fs = require("fs/promises");

const file = require("../util/file");
const logger = require("../util/logger");

manager.events = {};

manager.register = async function(client, config) {
    const events = await file.registerFiles(`${__dirname}/impl/`);
    manager.events = events;

    for (const event in events) {
        events[event].setup(client, config);
    }

    logger.info(`Loaded ${Object.keys(events).length} events!`);
}

module.exports = manager;