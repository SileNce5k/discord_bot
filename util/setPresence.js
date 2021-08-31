const getGuildCount = require("./getGuildCount")

module.exports = function ({presenceText, presenceType, client}) {
	const {globalPrefix} = require ('../data/config.json')
	let guildCount = getGuildCount(client)
	let regex = [/<guilds>/g,/<prefix>/g];
	let replaceValue = [guildCount, globalPrefix];
	for(let i = 0; i < regex.length; i++){
		presenceText = presenceText.replace(regex[i], replaceValue[i]);
	}
	client.user.setActivity(presenceText, { type: presenceType });
}