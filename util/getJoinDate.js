module.exports = function(user, guild){
	const member = guild.member(user)
	let date = member.joinedAt;
	return date.getUTCFullYear().toString()+"-"+date.getUTCMonth()+"-"+date.getUTCDate()+" "+date.getUTCHours()+":"+date.getUTCMinutes()+":"+date.getUTCSeconds();
}