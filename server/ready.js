const loadServerPrefixes = require('../util/loadServerPrefixes');
const updatePresence = require('../util/updatePresence');

module.exports = function(client, enableLoginMessage, loginChannel, loginMessage) {
	console.clear();
	updatePresence(client)
	console.log('Ready!');
	if (enableLoginMessage === true)
		try{
			client.channels.cache.get(loginChannel).send(loginMessage)
		}catch(err){
			console.log("Failed trying to send a message on login.\n")
		}
	loadServerPrefixes(client)
}
