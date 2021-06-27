const Discord = require('discord.js');
const { prefix } = require('../data/config.json');
const creationJoinDates = require("../util/creationJoinDates")



module.exports = {
	name: 'botinfo',
	description: 'Shows information about the bot',
	execute({message, client}) {
		let createJoin = creationJoinDates(client.user)
		const embed = new Discord.MessageEmbed()
			.setColor(15780145)
			.setTitle("Information about bot")
			.setTimestamp()
			.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, size: 4096 }))
			.addFields({ 
				name: "General info", value: `Name: ${client.user.username}\nPrefix: ${prefix}\nTotal Servers: ${client.guilds.toString().length}\nCreation Date: ${createJoin.creation}\nSource: [Click Here](https://github.com/SileNce5k/discord_bot)`,
			},)

		message.channel.send(embed)

	}
};