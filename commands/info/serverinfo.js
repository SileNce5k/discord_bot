const Discord = require('discord.js');
const convertDateToISOString = require('../../util/convertDateToISOString');

module.exports = {
	name: 'serverinfo',
	description: 'Displays information about the server',
	execute({message}) {
		const embed = new Discord.MessageEmbed()
		
			.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 4096 }))
			.setColor("#ee7939")
			.setTimestamp()
			.addField("Server Owner: ", `<@${message.guild.ownerId}>`)
			.addField("Server Name: ", message.guild.name)
			.addField("Created", convertDateToISOString(message.guild.createdAt))
			.addField("Members: ", message.guild.memberCount.toString())
			//.addField("Emojis: ", message.guild.emojis.cache.array().length)

		message.channel.send({embeds :[embed]});
	
	
	}
};