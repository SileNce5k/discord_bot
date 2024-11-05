const loadServerPrefixes = require('../util/loadServerPrefixes');
const checkTimer = require('../util/timer/checkTimer');
const updatePresence = require('../util/updatePresence');

module.exports = function(client, enableLoginMessage, loginChannel, loginMessage) {
	updatePresence(client)
	console.log('Ready!');
	if (enableLoginMessage === true)
		try{
			client.channels.cache.get(loginChannel).send(loginMessage)
		}catch(err){
			console.error("Failed trying to send a message on login.\n")
			console.error(err)
		}
	loadServerPrefixes(client)
	checkTimer(client);
}
