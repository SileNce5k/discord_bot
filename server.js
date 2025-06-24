const fs = require('fs');
const createInitialConfig = require("./util/createInitialConfig")
const convertJSONToSQL = require('./util/timer/convertJSONToSQL');
const executeCommand = require('./util/executeCommand.js');
const sqlite3 = require('sqlite3').verbose();
if(!fs.existsSync("./data/config.json")) {
	createInitialConfig();
}
async function checkAndConvertJSONToSQL(){
	process.stdout.write("Checking if timers.json exists... ")
	if(fs.existsSync("./data/timers.json")){
		process.stdout.write(true + "\n")
		await createDatabaseTables();
		await convertJSONToSQL();
		fs.renameSync('data/timers.json', 'data/timers.json.old');
		console.log("Renamed timers.json to timers.json.old");
	}else{
		process.stdout.write(false + "\n")
	}
}
const createDatabaseTables = require('./server/createDatabaseTables');
const createLastfmTable = require('./server/createLastfmTable');
const createAndLoadWhitelistTable = require('./server/createAndLoadWhitelistTable.js')

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
client.whitelist = {
	guild: new Collection(),
	user: new Collection()
}
process.env.TZ = "UTC";

createAndLoadWhitelistTable(client.whitelist);

client.settings.set("presenceType", presenceType);
client.settings.set("presenceText", presenceText);
client.settings.set("globalPrefix", globalPrefix);
client.githash = executeCommand(`git`, ["rev-parse", "--short", "HEAD"])

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
	onMessage(client, owners, message);
});


client.login(token);