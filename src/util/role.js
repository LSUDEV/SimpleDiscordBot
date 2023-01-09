let util = {};

util.hasRoleById = function(member, id) {
    return member.roles.cache.has(id);
}

util.addRoleById = function(member, id) {
    const role = member.guild.roles.cache.get(id);

    if (!role)
        throw new Error(`role ${id} does not exist.`);

    return member.roles.add(role);
}

util.removeRoleById = function(member, id) {
    const role = member.guild.roles.cache.get(id);

    if (!role)
        throw new Error(`role ${id} does not exist.`);

    return member.roles.remove(role);
}

module.exports = util;