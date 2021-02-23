const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
const {
	prefix,
	token,
} = require('./config.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

console.log(client.commands);

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
				command.execute(message, client, args);
				break;
			case "say":
			case "e":
			case "help":
			case "userinfo":
				command.execute(message, args);
				break;
			default:
				command.execute(message)
		}
	} catch (error) {
		message.channel.send("That command either does not exist, or is broken.")
		console.log(`${error}\n-------`)
	}
});


client.login(token);