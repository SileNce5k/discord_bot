const {EmbedBuilder} = require('discord.js');
const convertDateToISOString = require('../../util/convertDateToISOString');

module.exports = {
	name: 'serverinfo',
	description: 'Displays information about the server',
	execute({message}) {
		const embed = new EmbedBuilder()
		
			.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 4096 }))
			.setColor("#ee7939")
			.setTimestamp()
			.addFields([
				{name: "Server Owner", value: `<@${message.guild.ownerId}>`, inline: false},
				{name: "Server Name", value: message.guild.name, inline: false},
				{name: "Created", value: convertDateToISOString(message.guild.createdAt), inline: false},
				{name: "Members", value: message.guild.memberCount.toString(), inline: false},
				{name: "Channels", value: message.guild.channels.channelCountWithoutThreads.toString(), inline: false},
				
			
			])
			//.addField("Emojis: ", message.guild.emojis.cache.array().length)

		message.channel.send({embeds :[embed]});
	
	
	}
};