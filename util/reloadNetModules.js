const fs = require('fs')
const netloadDir = 'netload/'


module.exports = function (client) {
	if (!fs.existsSync(netloadDir)) fs.mkdirSync(netloadDir);
	let commandFiles = fs.readdirSync(netloadDir).filter(file => file.endsWith('.js'));
	if (client.netmodules.size != 0) {
		for (const i of commandFiles) {
			delete require.cache[require.resolve(`../${netloadDir}${i}`)];
		}
	}
	client.netmodules.clear()
	for (const file of commandFiles) {
		const command = require(`../${netloadDir}${file}`);
		client.netmodules.set(command.name, command);
	}
}

