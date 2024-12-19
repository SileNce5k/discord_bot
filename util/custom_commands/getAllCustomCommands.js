

module.exports = function(client){
	let list = "";
	client.customCommands.keys().forEach(commandName => list += `${commandName}\n`)
	return list;
}