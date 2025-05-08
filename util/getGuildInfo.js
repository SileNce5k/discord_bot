module.exports = function(client){
	let guildCount = 0;
	let totalMembers = 0;
		client.guilds.cache.each(guild => {
			guildCount++
			totalMembers += guild.memberCount;
		});
	return {guildCount: guildCount, totalMembers: totalMembers};
}