const fs = require('fs');
const getSubdirFiles = require('./getSubdirFiles');
const commandPath = 'commands/'
const utilPath = 'util/'


module.exports = function (client) {
	let utilFiles = fs.readdirSync(utilPath).filter(file => file.endsWith('.js'));
	let commandFiles = getSubdirFiles(commandPath);


	if (client.commands.size != 0) {
		for (const i of commandFiles) {
			delete require.cache[require.resolve(`../${i}`)];
		}
		for (const i of utilFiles){
			delete require.cache[require.resolve(`../${utilPath}${i}`)]
		}
	}
	client.commands.clear()
	for (const file of commandFiles) {
		const command = require(`../${file}`);
		client.commands.set(command.name, command);
	}
}

