const fs = require('fs');
const createInitialConfig = require("./util/createInitialConfig")
const convertJSONToSQL = require('./util/timer/convertJSONToSQL');
const executeCommand = require('./util/executeCommand.js');
const initializeManagementAPI = require('./server/initializeManagementAPI');
const sqlite3 = require('sqlite3').verbose();
const Bot = require('./server/Bot').Bot;
const bot = new Bot();
if(!fs.existsSync("./data/config.json")) {
	createInitialConfig(bot);
}

async function checkAndConvertJSONToSQL(){
	bot.log("Checking if timers.json exists... ")
	if(fs.existsSync("./data/timers.json")){
		bot.log("found timers.json")
		await createDatabaseTables(bot);
		await convertJSONToSQL();
		fs.renameSync('data/timers.json', 'data/timers.json.old');
		bot.log("Renamed timers.json to timers.json.old");
	}else{
		bot.log("timers.json not found")
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
	presenceText,
	enableManagementAPI
} = require('./data/config.json');
if(enableManagementAPI) initializeManagementAPI(client, bot);

client.settings = new Collection();
client.commands = new Collection();
client.serverPrefixes = new Collection();
client.whitelist = {
	guild: new Collection(),
	user: new Collection()
}
process.env.TZ = "UTC";

createAndLoadWhitelistTable(client.whitelist, bot);

client.settings.set("presenceType", presenceType);
client.settings.set("presenceText", presenceText);
client.settings.set("globalPrefix", globalPrefix);

const githash = executeCommand(`git`, ["rev-parse", "--short", "HEAD"]);
client.githash = githash.error ? "N/A" : githash.output;

const reloadCommands = require("./util/reloadCommands.js");
const onMessage = require('./server/message');
const onReady = require('./server/ready');

reloadCommands(client)

client.once('ready', () => {
	onReady(client, enableLoginMessage, loginChannel, loginMessage)
});

client.once('reconnecting', () => {
	bot.log('Reconnecting!');
});

client.once('disconnect', () => {
	bot.log('Disconnect!');
});

client.on('messageCreate', async message => {
	onMessage(client, owners, message, bot); // Maybe have a global object for client, owners and bot?
});


client.login(token);