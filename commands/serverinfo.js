const Discord = require('discord.js')

module.exports = {
	name: 'serverinfo',
	description: 'Displays information about the server',
	execute(message) {
        const embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL())
            .setColor("#ee7939")
            .setTimestamp()
            .addField("Server Owner: ", message.guild.owner)
            .addField("Server Name: ", message.guild.name)
            .addField("Created", message.guild.createdAt.toISOString())


        message.channel.send(embed);
    
    
    }
};