module.exports = function(client){
	let guildCount = 0;
	let totalMembers = 0;
	const uniqueMembers = new Map();
		client.guilds.cache.each(guild => {
			guildCount++
			totalMembers += guild.memberCount;
			guild.members.cache.each(member => {
				if(!uniqueMembers.get(member.id)){
					uniqueMembers.set(member.id, true);
				}
			})
		});
	const uniqueMemberCount = uniqueMembers.size;
	return {guildCount, totalMembers, uniqueMemberCount};
}