const fs = require('fs');
const createInitialConfig = require("./util/createInitialConfig")
const convertTimerJSONToSQL = require('./util/timer/convertTimerJSONToSQL.js');
const createTimersTable = require('./server/createDatabaseTables/createTimersTable');
const createCustomCommandsTable = require('./server/createDatabaseTables/createCustomCommandsTable.js');
const convertCustomCommandsJSONToSQL = require('./server/convertCustomCommandsJSONToSQL.js');
const sqlite3 = require('sqlite3').verbose();
if(!fs.existsSync("./data/config.json")) {
	createInitialConfig();
}


const { Collection, Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, 
									GatewayIntentBits.GuildMessages, 
									GatewayIntentBits.MessageContent, 
									GatewayIntentBits.GuildMembers, 
									GatewayIntentBits.GuildPresences
									], partials: [Partials.Channel] });




async function checkAndConvertJSONToSQL(){
	process.stdout.write("Checking if timers.json exists... ")
	if(fs.existsSync("./data/timers.json")){
		process.stdout.write(true + "\n")
		await convertTimerJSONToSQL();

		fs.renameSync('data/timers.json', 'data/timers.json.old');
		console.log("Renamed timers.json to timers.json.old");
	}else{
		process.stdout.write(false + "\n")
	}

	process.stdout.write("Checking if customCommands.json exists... ")
	if(fs.existsSync('./data/customCommands.json')){
		process.stdout.write(true + "\n")
		await convertCustomCommandsJSONToSQL();

		fs.renameSync('data/customCommands.json', 'data/customCommands.json.old');
	}else{
		process.stdout.write(false + "\n")
	}
}

async function loadcustomCommands() {
    const db = new sqlite3.Database('data/database.db');
	client.customCommands = new Collection();
	db.all("SELECT * FROM customCommands", (error, commands) => {
		if(error){
			console.error("Error while loading custom commands:\n",error.message)
		}else {
			commands.forEach(command => {
				client.customCommands.set(command.customName, command.customMessage);
			})
		}
	})
}


function startBot(){
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
	
}

async function prepareBot(){
	const createLastfmTable = require('./server/createDatabaseTables/createLastfmTable');


	const taskGroups = [
		[
			createTimersTable,
			createLastfmTable,
			createCustomCommandsTable
		],
		[
			checkAndConvertJSONToSQL
		]
	];

	(async () => {
		for (const taskGroup of taskGroups) {
			await Promise.all(taskGroup.map(task => task()));
		}
		loadcustomCommands()
	})();
	
	

}

prepareBot().then( () => {
	startBot();
}).catch(error => {
	console.error("Error preparing the bot:\n", error)
})
