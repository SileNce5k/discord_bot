const fs = require('fs');
const customReplaceWithVariables = require('../util/custom_commands/customReplaceWithVariables');

module.exports = function(client, owners, message, globalPrefix){
	let prefix = globalPrefix;
	if (client.serverPrefixes.get(message.guild.id)) {
		prefix = client.serverPrefixes.get(message.guild.id)
	}
	
	let args = message.content.slice(prefix.length).split(" ")

	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);
	const netModule = client.netmodules.get(commandName);
	if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
	if (!command){
		if (netModule){
			try {
				netModule.execute({message: message, args: args, client: client, prefix: prefix})
			}catch(e){
				console.log(e)
			}
			return;
		}
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
		let t0 = performance.now();
		command.execute({ message: message, args: args, client: client, prefix: prefix, owners: owners, globalPrefix: globalPrefix})
		let t1 = performance.now();
		console.log(`${message.author.username}(id: ${message.author.id}) executed ${command.name} with '${args}' as arguments in ${(t1-t0).toFixed(2)} ms`)
	} catch (error) {
		let divider = "------------------------"
		console.log(divider)
		console.error(error)
		console.log(divider)
	} 
}