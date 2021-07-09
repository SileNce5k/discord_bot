const getGuildCount = require("./getGuildCount")

module.exports = function ({presenceText, presenceType, client}) {
	const {globalPrefix} = require ('../data/config.json')
	let guildCount = getGuildCount(client)
	let regex = /<guilds>/g
	presenceText = presenceText.replace(regex, guildCount)
	regex = /<prefix>/g
	presenceText = presenceText.replace(regex, globalPrefix)
	client.user.setActivity(presenceText, { type: presenceType });
}