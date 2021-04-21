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
			.setAuthor(client.user.username, "https://cdn.discordapp.com/avatars/481128222147477506/1a30f57f8e403f54aaca502012aeff14.png?size=2048")
			.addFields({ 
				name: "General info", value: `Name: ${client.user.username}\nPrefix: ${prefix}\nTotal Servers: ${client.guilds.toString().length}\nCreation Date: ${createJoin.creation}\nSource: [Click Here](https://github.com/SileNce5k/discord_bot)`,
			},)

		message.channel.send(embed)

	}
};