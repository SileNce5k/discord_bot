const Discord = require('discord.js');
const getCreationDate = require('../util/getCreationDate.js');
const getJoinDate = require('../util/getJoinDate.js');
const parseMention = require("../util/parseMention.js")

module.exports = {
	name: 'userinfo',
	description: 'Displays information about the user',
	moreHelp: ["Example: <prefix>userinfo <some_username>","It works with username, nickname, userid, and mention"],
	execute({message, args}) {
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


		const embed = new Discord.MessageEmbed()
			.setThumbnail(user.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
			.setColor(roleColor)
			.setTimestamp()
			.setAuthor(user.user.username, user.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
			.addField("Username", `**${user.user.username}#${user.user.discriminator}**${nickname}`)
			.addField("Presence", user.user.presence.activities[0].name)
			.addField("Joined", getJoinDate(user, message.guild))
			.addField("Creation date", getCreationDate(user), true)
			.addField("Join date", user.joinDate, true)

		message.channel.send(embed);
	}
};