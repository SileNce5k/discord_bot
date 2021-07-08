const getGuildCount = require('./getGuildCount')

module.exports = function (client) {
	const updatePresence = require('./updatePresence')
	let {
		presenceText,
		presenceType
	} = require('../data/config.json')
	
	if(presenceText.includes("<guilds>")){
		let guildCount = getGuildCount(client)
		let regex = /<guilds>/g
		presenceText = presenceText.replace(regex, guildCount)
		client.user.setActivity(presenceText, { type: presenceType });
	}

	
	setTimeout(updatePresence, 60000, client)
}
