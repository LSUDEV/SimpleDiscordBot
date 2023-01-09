const embed = require("../../../util/embed");
const logger = require("../../../util/logger");
const permission = require("../../../util/permission");

module.exports = {
    name: "rank",
    desc: "Replies with your rank.",
    category: "Miscellaneous",
    execute: function(client, config, message, args) {
        const target = message.mentions.members.first();

        const authorPermData = permission.get(target ? target : message.member);

        const channelEmbed = embed.success("Your rank is:", "", [
            {
                name: target ? target.user.tag : message.author.tag,
                value: `\`\`${authorPermData.level} - ${authorPermData.name}\`\``,
                inline: true
            }
        ]);

        message.channel.send({
            embeds: [ channelEmbed ]
        })
    }
}