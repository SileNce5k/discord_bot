const {EmbedBuilder} = require('discord.js');
const getCreationDate = require('../../util/getCreationDate');
const getGuildInfo = require('../../util/getGuildInfo');



module.exports = {
	name: 'botinfo',
	description: 'Shows information about the bot',
	execute({message, client, prefix}) {
		let guildInfo = getGuildInfo(client)
		let descriptionArr =  [`Name: ${client.user.username}`,
						   `Prefix: ${prefix}`,
						   `Total Servers: ${guildInfo.guildCount}`,
						   `Total Members: ${guildInfo.totalMembers}`,
						   `Total Commands: ${client.commands.size}`,
						   `Creation Date: ${getCreationDate(client)}`,
						   `Source: [Click Here](https://github.com/SileNce5k/discord_bot)`
		]

		let description = "";
		descriptionArr.forEach(desc => {
			description += `${desc}\n`;
		})
		
		const embed = new EmbedBuilder()
			.setColor(15780145)
			.setTitle("Information about bot")
			.setTimestamp()
			.setAuthor({name: client.user.username, iconURL: client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 })})
			.setDescription(description)

		message.channel.send({embeds :[embed]})

	}
};