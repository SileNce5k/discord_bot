const Discord = require('discord.js');
const getCreationDate = require('../../util/getCreationDate.js');
const getJoinDate = require('../../util/getJoinDate.js');
const getNickname = require('../../util/getNickname.js');
const morePresence = require('../../util/morePresence.js');
const parseMention = require("../../util/parseMention.js")

module.exports = {
	name: 'userinfo',
	description: 'Displays information about the user',
	moreHelp: ["Example: <prefix>userinfo <some_username>","It works with username, nickname, userid, and mention"],
	execute({message, args}) {
		let info;
		if (!args[0]) {
			info = message.author.id;
		} else {
			info = parseMention(args[0], message.guild);
		}
		let user = message.guild.members.cache.get(info);

		let nickname = getNickname(user, message.guild)
		if (nickname != null) {
			nickname = ` <:aka:572089580925485058> ${nickname}`;
		}else{
			nickname = "";
		}

		let roleColor = 15788778;
		if (user.roles.color) {
			roleColor = user.roles.color.color;
		}
		let presenceDetails = 0;
		let isPresence = false;
		let status = "Offline";
		if(user.presence != null){
			if(user.presence.activities.length > 0){
				presenceDetails = morePresence(user);
				isPresence = true;
			} 
			status = user.presence.status.charAt(0).toUpperCase()+user.presence.status.slice(1)
			
		}		
		let roles = "";
		user.roles.cache.each(role => {
			if (role.name != "@everyone")
				roles = roles+"<@&"+role.id+">\n";
		});
		let discriminator = user.user.discriminator;
		if(discriminator === "0") 
			discriminator = "";
		let username = `**${user.user.username}#${user.user.discriminator}**${nickname}`
		const embed = new Discord.MessageEmbed()
			.setThumbnail(user.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
			.setColor(roleColor)
			.setTimestamp()
			.setAuthor(user.user.username, user.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
			.addField("Username", username)
			.addField("Status", status, false)
			if(isPresence)
				embed.addField("Presence", user.presence.activities[0].name, false)
			if(presenceDetails != 0)
				embed.addField("Details", presenceDetails.toString(), false)
			embed.addField("Creation date", getCreationDate(user), true)
			embed.addField("Join date", getJoinDate(user, message.guild), true)
			if(roles != ""){
				embed.addField("Roles", roles)
			}

		message.channel.send({embeds :[embed]});
	}
};
