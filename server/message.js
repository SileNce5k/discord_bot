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
		}
		return;
	}
	if (command.admin && owners.indexOf(message.author.id.toString()) == -1) return;
	try {
		command.execute({ message: message, args: args, client: client, prefix: prefix, owners: owners})
		console.log(`${message.author.username}(id: ${message.author.id}) executed ${command.name} with '${args}' as arguments`)
	} catch (error) {
		console.log(`${error}\n-------`)
	}
}