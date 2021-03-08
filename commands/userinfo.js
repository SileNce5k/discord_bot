const Discord = require('discord.js');
const parseMention = require("../util/parseMention.js")
const creationJoinDates = require("../util/creationJoinDates")

module.exports = {
    name: 'userinfo',
    description: 'Displays information about the user',
    execute(message, args) {
        let info;
        let nickname = "";
        if (!args[0]) {
            info = message.author.id;
        } else {
            info = parseMention(args[0], message.guild);
        }
        var user = message.guild.members.cache.get(info);
        if (user.user.nickname) {
            nickname = ` <:aka:572089580925485058> ${user.user.nickname} `;
        }

        var roleColor = 15788778;
        if (user.roles.color) {
            roleColor = user.roles.color.color;
        }

        var createJoin = creationJoinDates(user.user)
        console.log(user.presence.activity)

        const embed = new Discord.MessageEmbed()
            .setThumbnail(user.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setColor(roleColor)
            .setTimestamp()
            .setAuthor(user.user.username, user.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .addField("Username", `**${user.user.username}#${user.user.discriminator}**${nickname}`)
            .addField("Presence", user.presence)
            //.addField("Joined", createJoin.joindate, true)
            .addField("Creation date", createJoin.creation, true)

        message.channel.send(embed);
    }
};