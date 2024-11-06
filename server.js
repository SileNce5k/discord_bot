const fs = require('fs');
const createInitialConfig = require("./util/createInitialConfig")
const convertTimerJSONToSQL = require('./util/timer/convertTimerJSONToSQL.js');
if(!fs.existsSync("./data/config.json")) {
	createInitialConfig();
}
async function checkAndConvertJSONToSQL(){
	process.stdout.write("Checking if timers.json exists... ")
	if(fs.existsSync("./data/timers.json")){
		process.stdout.write(true + "\n")
		await createTimerTables();
		await convertTimerJSONToSQL();
		fs.renameSync('data/timers.json', 'data/timers.json.old');
		console.log("Renamed timers.json to timers.json.old");
	}else{
		process.stdout.write(false + "\n")
	}
}
const createTimerTables = require('./server/createDatabaseTables/createTimersTable');
const createLastfmTable = require('./server/createDatabaseTables/createLastfmTable');
createLastfmTable();
checkAndConvertJSONToSQL();
const { Collection, Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, 
									  GatewayIntentBits.GuildMessages, 
									  GatewayIntentBits.MessageContent, 
									  GatewayIntentBits.GuildMembers, 
									  GatewayIntentBits.GuildPresences
									], partials: [Partials.Channel] });
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

client.settings = new Collection();
client.commands = new Collection();
client.serverPrefixes = new Collection();


client.settings.set("presenceType", presenceType);
client.settings.set("presenceText", presenceText);

const reloadCommands = require("./util/reloadCommands.js");
const onMessage = require('./server/message');
const onReady = require('./server/ready');

reloadCommands(client)

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