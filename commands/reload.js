const reloadNetModules = require("../util/reloadNetModules.js");

module.exports = {
	name: 'reload',
	description: 'Reloads modules.',
	admin: true,
	execute({message, client}) {

		let reloadCommands = require("../util/reloadCommands.js")
		let beforeSize = client.commands.size;
		let sendText;
		reloadNetModules(client)
		reloadCommands(client)
		if (beforeSize > client.commands.size) {
			let difference = beforeSize - client.commands.size;
			if (difference == 1)
				sendText = `${client.commands.size} modules were reloaded after ${difference} module was deleted.`
			else
				sendText = `${client.commands.size} modules were reloaded after ${difference} were disabled.`
		} else if (beforeSize < client.commands.size) {
			let difference = client.commands.size - beforeSize;
			if (difference == 1)
				sendText = `${difference} module was added, and a total of ${client.commands.size} were reloaded.`
			else
				sendText = `${difference} module were added, and a total of ${client.commands.size} were reloaded.`
		} else if (beforeSize === client.commands.size) {
			sendText = `${client.commands.size} modules were reloaded.`
		}
		message.channel.send(sendText)
	}
};