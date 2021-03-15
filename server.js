const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
const {
	globalPrefix,
	token,
	loginMessage,
	loginChannel,
	enableLoginMessage,
	owners
} = require('./config.json');

client.commands = new Discord.Collection();
client.serverPrefixes = new Discord.Collection();
client.netmodules = new Discord.Collection();

var reloadCommands = require("./util/reloadCommands.js");
const loadServerPrefixes = require('./util/loadServerPrefixes');
const loadNetModules = require('./util/loadNetModules');
reloadCommands(client)
loadNetModules(client)

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity(globalPrefix, { type: 'LISTENING' });
	if (enableLoginMessage === true)
	try{
	client.channels.cache.get(loginChannel).send(loginMessage)
	}catch(err){
		console.log("Failed trying to send a message on login.\n")
	}
	loadServerPrefixes(client)
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {

	if (client.serverPrefixes.get(message.guild.id)) {
		prefix = client.serverPrefixes.get(message.guild.id)
	} else
		prefix = globalPrefix

	let args = message.content.slice(prefix.length).split(" ")

	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);
	const netModule = client.netmodules.get(commandName);
	if (!message.guild) return;
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
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
	} catch (error) {
		console.log(`${error}\n-------`)
	}
});


client.login(token);