let util = {};

const discord = require("discord.js");

util.create = function(color, title, desc, fields) {
    fields = fields || [];

    const embed = new discord.MessageEmbed()
        .setFooter({
            text: "GST",
            iconURL: "https://i.imgur.com/U7CTXam.png"
        })
        .setColor(color)
        .setTitle(title)
        .setDescription(desc)
        .setFields(fields)
        .setTimestamp()

    return embed;
}

util.success = function(title, desc, fields) {
    fields = fields || [];

    return util.create("#00ff00", title, desc, fields);
}

util.warn = function(title, desc, fields) {
    fields = fields || [];

    return util.create("#ffa500", title, desc, fields);
}

util.error = function(title, desc, fields) {
    fields = fields || [];

    return util.create("#ff0000", title, desc, fields);
}   

module.exports = util;