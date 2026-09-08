const leftPad = require("../../util/leftPad");
const rightPad = require("../../util/rightPad");

module.exports = {
	name: 'guilds',
	description: 'Returns guild names',
	admin: true,
	execute({message, client}) { 
		let guilds = new Map();
		client.guilds.cache
			.sort((a, b) => b.memberCount - a.memberCount)
			.each(guild => {
				guilds.set(guild.name, guild.memberCount);
			});
		let names = Array.from(guilds.keys()) 
		let memberCounts = Array.from(guilds.values());
		for(let i = 0; i < memberCounts.length; i++) {
			memberCounts[i] = memberCounts[i].toString();
		}
		let alignedGuildNames   = rightPad(names);
		let alignedMemberCounts = leftPad(memberCounts)

		let guildInfo = "";
		for(let i = 0; i < alignedGuildNames.length; i++){
			guildInfo = `${guildInfo}${alignedGuildNames[i]} ${alignedMemberCounts[i]} members\n`;
		}
			
		message.channel.send(`\n\`\`\`${guildInfo}\n\`\`\``)
	}
};