const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
const {
	prefix,
	token,
} = require('./config.json');

client.commands = new Discord.Collection();

var reloadCommands = require("./util/reloadCommands.js")
reloadCommands(client)

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity(prefix, { type: 'LISTENING' });

});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	const args = message.content.slice(prefix.length).split(" ")
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);
	if (!message.guild) return; 
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	try {
		command.execute({message:message, args:args, client: client})
	} catch (error) {
		console.log(`${error}\n-------`)
	}
});


client.login(token);