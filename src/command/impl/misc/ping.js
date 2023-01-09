const embed = require("../../../util/embed");
const logger = require("../../../util/logger");

module.exports = {
    name: "ping",
    desc: "Ping Pong!",
    category: "Miscellaneous",
    execute: function(client, config, message, args) {
        const channelEmbed = embed.success("Pong! :ping_pong:", "", [
            {
                name: "Websocket",
                value: `${client.ws.ping}ms`,
                inline: true
            },
            {
                name: "API",
                value: `${Date.now() - message.createdTimestamp}ms`,
                inline: true
            }
        ]);

        message.channel.send({
            embeds: [ channelEmbed ]
        })
    }
}