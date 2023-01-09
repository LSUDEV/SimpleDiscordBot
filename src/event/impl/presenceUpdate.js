const role = require("../../util/role");

module.exports = {
    name: "presenceUpdate",
    setup: function(client, config) {
        client.on("presenceUpdate", async function(_oldPresence, newPresence) {
            const member = newPresence.member
            if (member) {
                if (member.roles.cache.has(config.role.mains)) {
                    if(member.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes('.gg/gst'))) return;
                    if(!member.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes('.gg/gst'))){
                        role.removeRoleById(member, config.role.mains)
                    }
                }
                if (!member.roles.cache.has(config.role.mains)) {
                    if (member.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes('.gg/gst'))) {
                        role.addRoleById(member, config.role.mains);
                    }  
                }
            }
        });
    }
}