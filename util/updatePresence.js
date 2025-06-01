const setPresence = require('./setPresence')

module.exports = function (client) {
	let presenceText = client.settings.get("presenceText")
	let presenceType = client.settings.get("presenceType")

	if(presenceText.includes("${guilds}") || presenceText.includes("${prefix}") || presenceText.includes("${uptime}")) {
		setPresence({presenceText: presenceText, presenceType: presenceType, client: client});	
	}
}
