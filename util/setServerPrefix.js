const fs = require('fs');


module.exports = function (client, newPrefix, guildID) {
	let isExists = false;
	const json = fs.readFileSync('/data/serverPrefixes.json', 'utf8');
	const serverPrefixes = JSON.parse(json);
	serverPrefixes.forEach(function (server) {
		if (server.id === guildID) {
			server.prefix = newPrefix
			client.serverPrefixes.set(server.id, newPrefix)
			fs.writeFileSync("/data/serverPrefixes.json", JSON.stringify(serverPrefixes, null, 4));
			isExists = true;
		}
	});
	if (!isExists) {
		let _newPrefix = {
			"id": guildID, "prefix": newPrefix
		}

		serverPrefixes.push(_newPrefix)
		fs.writeFileSync("/data/serverPrefixes.json", JSON.stringify(serverPrefixes, null, 4))
		client.serverPrefixes.set(guildID, newPrefix)
	}
}