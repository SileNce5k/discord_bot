const setPresence = require('./setPresence')

module.exports = function (client) {
	const updatePresence = require('./updatePresence')
	let presenceText = client.settings.get("presenceText")
	let presenceType = client.settings.get("presenceType")

	if(presenceText.includes("<guilds>") || presenceText.includes("<prefix>")){
		setPresence({presenceText: presenceText, presenceType: presenceType, client: client});	
	}

	
	setTimeout(updatePresence, 60000, client)
}
