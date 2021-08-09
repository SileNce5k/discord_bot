const convertDateToISOString = require("./convertDateToISOString");
module.exports = function(user, guild){
	const member = guild.members.cache.get(user.user.id)
	let date = member.joinedAt;
	return convertDateToISOString(date)
}