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

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	try {
		
		switch (commandName) {
			case "ban":
			case "botinfo":
			case "reload":
			case "uptime":
				command.execute(message, client, args);
				break;
			case "say":
			case "e":
			case "help":
			case "userinfo":
			case "katti":
				command.execute(message, args);
				break;
			default:
				command.execute(message)
		}
	} catch (error) {
		console.log(`${error}\n-------`)
	}
});


client.login(token);