const Command = require('../Command')
const DiscordServer = require('../../DiscordServer')

module.exports =
class VerifyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'verify',
            userPermissions: [],
            description: "RoVer will check the sender's verification status.",
        });
    }

    async fn(msg) {
        // The user ran `!verify`, we are checking their status now.
            
        // Clear the request cache so we get fresh information.
        DiscordServer.clearMemberCache(msg.author.id);

        let server = this.discordBot.getServer(msg.guild.id)
        let action = await server.verifyMember(msg.author.id);

        // We reply with the status of the verification in the
        // channel the command was sent.
        if (!action.status) {
            msg.reply(action.error);
        } else {
            msg.reply(server.getWelcomeMessage(action));
        }
    }
}