const commandManager = require("../../command/manager");
const filterManager = require("../../filter/manager");

const embed = require("../../util/embed");
const logger = require("../../util/logger");
const permission = require("../../util/permission");

module.exports = {
    name: "messageCreate",
    setup: function(client, config) {
        client.on("messageCreate", function(message) {
            if (message.author.bot)
                return;

            if (filterManager.execute(message, config))
                return;

            const content = message.content;
            const prefix = config.discord.prefix.toLowerCase();
            const authorPerms = permission.get(message.member);
            const commands = commandManager.commands;

            if (!content.startsWith(prefix))
                return;

            const args = content.slice(prefix.length).split(" ");
            const commandName = args.shift().toLowerCase();

            const command = commands[commandName];

            if (!command) {
                if (authorPerms.level <= 1)
                    return message.delete();
                else
                    return;
            }

            const minPermLevel = command.minPermLevel || 1;
            const maxPermLevel = command.maxPermLevel || 9e9;

            if (config.command.disabled.includes(command.name)) {
                const msgEmbed = embed.error("Command disabled.", `The command \`\`${command.name}\`\` is currently disabled!`);
                
                return message.channel.send({
                    embeds: [ msgEmbed ]
                });
            }

            const tooLow = minPermLevel > authorPerms.level;
            const tooHigh = maxPermLevel < authorPerms.level;
            if (tooLow || tooHigh) {
                const msgEmbed = embed.error("You are not allowed to use this command!", 
                    tooLow ? `To use this command you must be \`\`${minPermLevel} - ${permission.levels[minPermLevel]}\`\`, but you are only \`\`${authorPerms.level} - ${authorPerms.name}\`\`.`
                    : `To use this command you must be under \`\`${maxPermLevel + 1} - ${permission.levels[maxPermLevel + 1]}\`\`, but you are \`\`${authorPerms.level} - ${authorPerms.name}\`\`.`);
                
                return message.channel.send({
                    embeds: [ msgEmbed ]
                });
            }
        
            try {
                command.execute(client, config, message, args, commands);
            } catch (err) {
                console.error(`An error has occured while executing "${commandName}". ${err}`);
                const msgEmbed = embed.error("Uh, oh...", `An error has occured while executing \`\`${commandName}\`\`. Please report this to a developer or higher.`);

                return message.channel.send({
                    embeds: [ msgEmbed ]
                });
            }
        })
    }
}