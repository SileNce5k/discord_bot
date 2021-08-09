module.exports = function(user, guild){
	return guild.members.cache.get(user.user.id).nickname
}