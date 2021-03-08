const Discord = require('discord.js');

module.exports = {
	name: 'reload',
	description: 'Reloads modules.',
	admin: true,
	execute(message, client) {

		let reloadCommands = require("../util/reloadCommands.js")
		let beforeSize = client.commands.size;
		let sendText;

		reloadCommands(client)
		if (beforeSize > client.commands.size) {
			let difference = beforeSize - client.commands.size;
			if (difference == 1)
				sendText = `${difference} module was removed and ${client.commands.size} were reloaded.`
			else
				sendText = `${difference} modules were removed and ${client.commands.size} were reloaded.`
		} else if (beforeSize < client.commands.size) {
			let difference = client.commands.size - beforeSize;
			if (difference == 1)
				sendText = `${difference} module was added and ${client.commands.size} in total were reloaded`
			else
				sendText = `${difference} modules were added and ${client.commands.size} in total were reloaded`
		} else if (beforeSize === client.commands.size) {
			sendText = `${client.commands.size} modules were reloaded`
		}
		message.channel.send(sendText)
	}
};