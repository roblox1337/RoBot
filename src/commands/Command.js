const Commando = require('discord.js-commando')

module.exports =
class Command extends Commando.Command {
    constructor(client, info) {
        info.group = 'rover';
        info.guildOnly = true;
        info.memberName = info.name;
        
        super(client, info);

        this.userPermissions = info.userPermissions || ['ADMINISTRATOR'];
        this.discordBot = this.client.discordBot;
    }

    hasPermission(msg) {
        return msg.member.hasPermissions(this.userPermissions);
    }

    async run(msg, args, pattern) {
        this.server = this.discordBot.getServer(msg.guild.id);
        return await this.fn(msg, args, pattern);
    }
}