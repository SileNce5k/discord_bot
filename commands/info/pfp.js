const parseMention = require("../../util/parseMention.js")

module.exports = {
	name: 'pfp',
	description: 'Returns profile picture',
	moreHelp: ["Returns your profile picture if no arguments are provided",
			   "Argument can be username, nickname, userid, and mention",
			   "If the user has a pfp for the current guild, it will be returned as well"],
	execute({message, args}) {
		let info;
		if (!args[0]) {
			info = message.author.id;
		} else {
			info = parseMention(args[0], message.guild);
		}
		let user = message.guild.members.cache.get(info);
		let guildPfp = user.avatarURL({format: 'png', dynamic: true, size: 4096});
		let globalPfp = user.user.avatarURL({format: 'png', dynamic: true, size: 4096});
		let sendText = `${globalPfp}`;
		if(guildPfp != null){
			sendText = `Global pfp${sendText}\nGuild pfp:\n${guildPfp}`;
		}

		message.channel.send(sendText)
	}
};