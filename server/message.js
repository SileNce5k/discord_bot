const fs = require('fs');
const customReplaceWithVariables = require('../util/custom_commands/customReplaceWithVariables');

module.exports = function(client, owners, message, globalPrefix){
	let prefix = globalPrefix;
	let serverPrefix = client.serverPrefixes.get(message.guild.id);
	if (serverPrefix) {
		prefix = serverPrefix;
	}

	
	if(message.content.startsWith(`<@${client.user.id}>`)){
		let regex = new RegExp("(<@" + client.user.id + ">) *")
		message.content = message.content.replace(regex, prefix);
	}	
	if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
	let args = message.content.slice(prefix.length).split(" ")
	if(args[0] !== "fm" && args[0].startsWith("fm")){
		let firstElement = args[0];
		args.splice(0, 1, firstElement.substring(0, 2), firstElement.substring(2));
	}

	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);
	if (!command){
		const customPath = './data/customCommands.json';
		if(fs.existsSync(customPath)){
			let json = fs.readFileSync(customPath, 'utf8');
			let customCommands = JSON.parse(json)
			customCommands.forEach(function (customCommand) {
				if (customCommand.customName === commandName) {
					let customMessage = customReplaceWithVariables(customCommand.customMessage, message, prefix, globalPrefix)
					message.channel.send(customMessage)
				}
			});
		}
		return;
	}
	if (command.admin && owners.indexOf(message.author.id.toString()) == -1) return;
	try {
		command.execute({ message: message, args: args, client: client, prefix: prefix, owners: owners, globalPrefix: globalPrefix})
		console.log(`${message.author.username}(id: ${message.author.id}) executed ${command.name} with '${args}' as arguments`)
	} catch (error) {
		let divider = "------------------------"
		console.log(divider)
		console.error(error)
		console.log(divider)
	} 
}