const {EmbedBuilder} = require('discord.js');
const getCreationDate = require('../../util/getCreationDate');
const getGuildCount = require('../../util/getGuildCount');



module.exports = {
	name: 'botinfo',
	description: 'Shows information about the bot',
	execute({message, client, prefix}) {
		let guildCount = getGuildCount(client)
		const embed = new EmbedBuilder()
			.setColor(15780145)
			.setTitle("Information about bot")
			.setTimestamp()
			.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, size: 4096 }))
			.addFields({ 
				name: "General info", value: `Name: ${client.user.username}\nPrefix: ${prefix}\nTotal Servers: ${guildCount}\nCreation Date: ${getCreationDate(client)}\nSource: [Click Here](https://github.com/SileNce5k/discord_bot)`,
			},)

		message.channel.send({embeds :[embed]})

	}
};