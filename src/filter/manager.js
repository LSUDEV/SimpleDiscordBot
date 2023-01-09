let manager = {};

const fs = require("fs/promises");

const file = require("../util/file");
const logger = require("../util/logger");

manager.filters = {};

manager.register = async function() {
    const filters = await file.registerFiles(`${__dirname}/impl/`);
    manager.filters = filters;
    logger.info(`Loaded ${Object.keys(filters).length} filters!`);
}

manager.execute = function(message, config) {
    let result = false;

    for (const name in manager.filters) {
        const filterResult = manager.filters[name].execute(message, config);

        if (filterResult == true)
            result = true;
    }

    return result;
}

module.exports = manager;