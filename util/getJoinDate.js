const convertDateToISOString = require("./convertDateToISOString");
module.exports = function(user, guild){
	const member = guild.member(user)
	let date = member.joinedAt;
	return convertDateToISOString(date)
}