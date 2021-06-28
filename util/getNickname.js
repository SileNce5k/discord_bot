module.exports = function(user, guild){
	return guild.member(user.user).nickname
}