const setServerPrefix = require("../../util/setServerPrefix");
const { PermissionsBitField } = require('discord.js');

module.exports = {
	name: 'prefix',
	description: 'Change the prefix of the bot in this server.',
	execute({ message, client, args, prefix }) {
		if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
			message.channel.send("You do not have sufficient permissions(MANAGE_GUILD) to change the prefix of this server.")
			return;
		}
		if (!args[0]) {
			message.channel.send(`To change the prefix, execute \`${prefix}prefix <newPrefix>\``);
			return;
		}else{
			setServerPrefix(client, args[0], message.guild.id)
			message.channel.send(`The prefix for this server is now set to ${args[0]}\nIf for some reason you are unable to use the new prefix, you can mention the bot as a prefix instead`);
		}
	}
};