const Discord = require('discord.js');
const {prefix} = require('../config.json');



module.exports = {
	name: 'botinfo',
	description: 'Shows information about the bot',
	execute(message, client) {
        console.log(client)
		const embed = new Discord.MessageEmbed()
            .setColor(15780145)
            .setTitle("Information about bot")
            .setTimestamp()
            .setFooter('https://github.com/SileNce5k/Soilens_BotJS')
            .setAuthor("soilens bot", "https://cdn.discordapp.com/avatars/481128222147477506/1a30f57f8e403f54aaca502012aeff14.png?size=2048")
            .addFields(
                { name: "General info", value: `Name: ${client.user.username}\nPrefix: ${prefix}`},
            )
        message.channel.send(embed)

	}
};