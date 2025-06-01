const setPresence = require('./setPresence')

module.exports = function (client) {
	let presenceText = client.settings.get("presenceText")
	let presenceType = client.settings.get("presenceType")

	setPresence({presenceText: presenceText, presenceType: presenceType, client: client});	
}
