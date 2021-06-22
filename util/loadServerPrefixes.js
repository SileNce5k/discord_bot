const fs = require('fs')


module.exports = function (client) {
	try {
		if(!fs.existsSync('./data/serverPrefixes.json')){
			console.log("Creating load serverPrefixes.json...")
			fs.writeFileSync("./data/serverPrefixes.json","[]")
		}
		const json = fs.readFileSync('./data/serverPrefixes.json', 'utf8');
		const serverPrefixes = JSON.parse(json);
		serverPrefixes.forEach(server => {
			client.serverPrefixes.set(server.id, server.prefix)
		});
	} catch (err) {
		console.log(`Error reading file from disk: ${err}`);
	}
}