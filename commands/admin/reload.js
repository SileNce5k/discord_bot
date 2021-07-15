const calculateReloaded = require("../../util/calculateReloaded.js");
const reloadNetModules = require("../../util/reloadNetModules.js");

module.exports = {
	name: 'reload',
	description: 'Reloads modules.',
	admin: true,
	execute({message, client}) {

		let reloadCommands = require("../../util/reloadCommands.js")
		let beforeSize = client.commands.size;
		reloadNetModules(client)
		reloadCommands(client)
		let sendText = calculateReloaded(beforeSize, client)
		message.channel.send(sendText)
	}
};