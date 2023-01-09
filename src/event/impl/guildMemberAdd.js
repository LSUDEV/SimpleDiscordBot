const role = require("../../util/role");

module.exports = {
    name: "guildMemberAdd",
    setup: function(client, config) {
        client.on("guildMemberAdd", async function(member) {
        });
    }
}