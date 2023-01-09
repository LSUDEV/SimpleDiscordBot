let util = {};

const config = require("../../config.json");

const role = require("./role");

util.levels = {
    5: "Owner",
    4: "Whitelister",
    3: "Staff",
    2: "Whitelisted",
    1: "Member"
}

util.get = function(member) {
    let level = 1;

    if (config.other.owners.includes(member.id))
        level = 5;
    else if (role.hasRoleById(member, config.role.staff))
        level = 3;
    else if (role.hasRoleById(member, config.role.whitelisted))
        level = 2;

    return {
        level: level,
        name: util.levels[level]
    };
}

module.exports = util;