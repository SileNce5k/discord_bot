const fs = require('fs');
const createInitialConfig = require("./util/createInitialConfig")
if(!fs.existsSync("./data/config.json")) {
	createInitialConfig();
}
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
const {
	globalPrefix,
	token,
	loginMessage,
	loginChannel,
	enableLoginMessage,
	owners
} = require('./data/config.json');

client.commands = new Discord.Collection();
client.serverPrefixes = new Discord.Collection();
client.netmodules = new Discord.Collection();

const reloadCommands = require("./util/reloadCommands.js");
const reloadNetModules = require('./util/reloadNetModules');
const onMessage = require('./server/message');
const onReady = require('./server/ready');
reloadCommands(client)
reloadNetModules(client)

client.once('ready', () => {
	onReady(client, enableLoginMessage, loginChannel, loginMessage)
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	onMessage(client, owners, message, globalPrefix);
});


client.login(token);