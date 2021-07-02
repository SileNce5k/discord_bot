const fs = require('fs');

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
					message.channel.send(customCommand.customMessage)
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