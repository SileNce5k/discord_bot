module.exports = {
	name: 'guilds',
	description: 'Returns guild names',
	admin: true,
	execute({message, client}) { 
		let guildNames = "";
		client.guilds.cache.each(guild => {
			guildNames = guildNames + guild.name + "\n";
		});
		message.channel.send(guildNames)
	}
};