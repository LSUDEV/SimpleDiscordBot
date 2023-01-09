const logger = require("../../util/logger");

module.exports = {
    name: "ready",
    setup: function(client, config) {
        client.on("ready", function() {
            logger.info("The bot is ready.");

            client.user.setActivity({
                name: "over discord.gg/gst",
                type: "WATCHING"
            });
        })
    }
}