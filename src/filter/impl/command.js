const commandManager = require("../../command/manager");
const permission = require("../../util/permission");

module.exports = {
    name: "command",
    desc: "Delete all commands sent outside of the bot channel and all non-command messages sent in the bot channel.",
    execute: function(message, config) {
        const content = message.content;
        const firstContent = content.split(" ")[0];
        const prefix = config.discord.prefix.toLowerCase();
        const authorPerms = permission.get(message.member);

        const wrongChannel = !config.channel.bot.includes(message.channel.name) && content.startsWith(prefix);
        const wrongPrefix = firstContent.match(/[\W]/g) != null && firstContent.split(/[\W]/g).filter((text) => commandManager.names.includes(text)).length != 0;
        const invalidCommand = config.channel.bot.includes(message.channel.name) && !content.startsWith(prefix);
        
        if ((wrongChannel || wrongPrefix || invalidCommand) && authorPerms.level <= 2) {
        }
    }
}