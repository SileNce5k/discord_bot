const rightPad = require("../../util/rightPad");

module.exports = {
	name: 'guilds',
	description: 'Returns guild names',
	admin: true,
	execute({message, client}) { 
		let guilds = new Map();
		let guildNames = client.guilds.cache
			.sort((a, b) => b.memberCount - a.memberCount)
			.each(guild => {
				guilds.set(guild.name, guild.memberCount);
			})
			let names = Array.from(guilds.keys()) 
			let alignedNames = rightPad(names);
			let finalText = "";
			for(let i = 0; i < alignedNames.length; i++){
				finalText = `${finalText}${alignedNames[i]} (${Array.from(guilds.values())[i]} members)\n`;
			}
			
			
		message.channel.send(`\n\`\`\`${finalText}\n\`\`\``)
	}
};