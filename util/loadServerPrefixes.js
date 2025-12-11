const fs = require('fs')


module.exports = function (client, bot) {
	try {
		if(!fs.existsSync('./data/serverPrefixes.json')){
			bot.log("Creating loadserverPrefixes.json...")
			fs.writeFileSync("./data/serverPrefixes.json","[]")
		}
		const json = fs.readFileSync('./data/serverPrefixes.json', 'utf8');
		const serverPrefixes = JSON.parse(json);
		serverPrefixes.forEach(server => {
			client.serverPrefixes.set(server.id, server.prefix)
		});
	} catch (err) {
		bot.log(`Error reading file from disk: ${err}`);
	}
}