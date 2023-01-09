const discord = require("discord.js");
const fs = require("fs/promises");

const config = require("../config.json");

const commandManager = require("./command/manager");
const eventManager = require("./event/manager");
const filterManager = require("./filter/manager");
const logger = require("./util/logger");

const client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_MEMBERS,
        discord.Intents.FLAGS.DIRECT_MESSAGES,
        discord.Intents.FLAGS.GUILD_PRESENCES
    ]
});

async function run() {
    commandManager.register();
    eventManager.register(client, config);
    filterManager.register()

    client.login(config.discord.token);
}
run();