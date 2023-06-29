const getNickname = require('../getNickname')

module.exports = function(customMessage, message, prefix, globalPrefix){

	let user = message.guild.members.cache.get(message.author.id);
	let nickname = getNickname(user, message.guild)
	let username = user.user.username
	let userID = user.user.id
	let guildName = message.guild.name
	let guildID = message.guild.id

	let variables = ["<prefix>", "<globalPrefix>", "<username>", "<nickname>", "<user_id>", "<guild_name>", "<guild_id>"]
	let replacer = [prefix, globalPrefix, username, nickname, userID, guildName, guildID]


	for (let i = 0; i < variables.length; i++){
		const regex = new RegExp(variables[i], 'g')
		customMessage = customMessage.replace(regex, replacer[i])
	}

	return customMessage
}