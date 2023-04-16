const fs = require('fs');
const createInitialConfig = require("./util/createInitialConfig")
if(!fs.existsSync("./data/config.json")) {
	createInitialConfig();
}
if(!fs.existsSync("./data/timers.json")){
	fs.writeFileSync('./data/timers.json', "[]");
}
const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_PRESENCES] });
const {
	globalPrefix,
	token,
	loginMessage,
	loginChannel,
	enableLoginMessage,
	owners,
	presenceType,
	presenceText
} = require('./data/config.json');

client.settings = new Discord.Collection();
client.commands = new Discord.Collection();
client.serverPrefixes = new Discord.Collection();
client.netmodules = new Discord.Collection();
client.timers = require('./data/timers.json');

if(!fs.existsSync("./data/lastTimerID.txt")){
	fs.writeFileSync('./data/lastTimerID.txt', "0");
}
client.lastTimerID = parseInt(fs.readFileSync('./data/lastTimerID.txt', 'utf8'));

client.settings.set("presenceType", presenceType);
client.settings.set("presenceText", presenceText);

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

client.on('messageCreate', async message => {
	onMessage(client, owners, message, globalPrefix);
});


client.login(token);