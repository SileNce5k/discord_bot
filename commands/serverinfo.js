const Discord = require('discord.js')

module.exports = {
	name: 'serverinfo',
	description: 'Displays information about the server',
	execute(message) {
        console.log(message.guild.emojis.cache)
        const embed = new Discord.MessageEmbed()
        
            .setThumbnail(message.guild.iconURL())
            .setColor("#ee7939")
            .setTimestamp()
            .addField("Server Owner: ", `<@${message.guild.ownerID}>`)
            .addField("Server Name: ", message.guild.name)
            .addField("Created", message.guild.createdAt.toUTCString())
            .addField("Members: ", message.guild.memberCount)
            //.addField("Emojis: ", message.guild.emojis.cache.array().length)

        message.channel.send(embed);
    
    
    }
};