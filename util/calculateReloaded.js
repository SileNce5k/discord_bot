module.exports = function(beforeSize, client){
	let sendText;
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
	return sendText;
}