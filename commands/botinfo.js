const Discord = require('discord.js');
const { prefix } = require('../config.json');



module.exports = {
    name: 'botinfo',
    description: 'Shows information about the bot',
    execute(message, client) {
       var creationDate = client.user.createdAt
       var hour = creationDate.getHours().toString();
        if (hour.length == 1) {
            hour = "0" + hour;
        }
       var minutes = creationDate.getMinutes().toString();
        if (minutes.length == 1) {
            minutes = "0" + minutes;
        }
       var seconds = creationDate.getSeconds().toString();
        if (seconds.length == 1) {
           var seconds = "0" + seconds;
        }

        var monthcreate = (creationDate.getMonth() + 1).toString();
        if (monthcreate.length == 1) {
            monthcreate = "0" + monthcreate;
        }

        datecreate = creationDate.getDate().toString();
        if (datecreate.length == 1) {
            datecreate = "0" + datecreate;
        }
        const embed = new Discord.MessageEmbed()
            .setColor(15780145)
            .setTitle("Information about bot")
            .setTimestamp()
            .setFooter('https://github.com/SileNce5k/Soilens_BotJS')
            .setAuthor("soilens bot", "https://cdn.discordapp.com/avatars/481128222147477506/1a30f57f8e403f54aaca502012aeff14.png?size=2048")
            .addFields(
                { name: "General info", value: `Name: ${client.user.username}\nPrefix: ${prefix}\nCreation Date: ${creationDate.getFullYear()}-${monthcreate}-${datecreate} ${hour}:${minutes}:${seconds}` },
            )
        message.channel.send(embed)

    }
};