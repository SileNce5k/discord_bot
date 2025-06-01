const loadServerPrefixes = require('../util/loadServerPrefixes');
const checkTimer = require('../util/timer/checkTimer');
const updatePresence = require('../util/updatePresence');

module.exports = function(client, enableLoginMessage, loginChannel, loginMessage) {
	
	updatePresence(client)
	client.lastPresenceUpdate = Date.now()

	setInterval(() => {
		updatePresence(client)
		client.lastPresenceUpdate = Date.now()
	}, 60 * 1000);
	
	console.log('Ready!');
	if (enableLoginMessage === true)
		try{
			client.channels.cache.get(loginChannel).send(loginMessage)
		}catch(err){
			console.log("Failed trying to send a message on login.\n")
		}
	loadServerPrefixes(client)
	checkTimer(client);
}
