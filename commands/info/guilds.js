module.exports = {
	name: 'guilds',
	description: 'Returns guild names',
	admin: true,
	execute({message, client}) { 
		let guildNames = client.guilds.cache
			.sort((a, b) => b.memberCount - a.memberCount)
			.map(guild => `${guild.name} (${guild.memberCount} members)`)
			.join("\n");
		message.channel.send(guildNames)
	}
};