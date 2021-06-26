const parseMention = require("../util/parseMention.js")

module.exports = {
	name: 'pfp',
	description: 'Returns profile picture',
	moreHelp: ["Returns your profile picture if no arguments are provided",
			   "Argument can be username, nickname, userid, and mention"],
	execute({message, args}) {
		let info;
		if (!args[0]) {
			info = message.author.id;
		} else {
			info = parseMention(args[0], message.guild);
		}
		let user = message.guild.members.cache.get(info);

		message.channel.send(user.user.avatarURL({ format: 'png', dynamic: true, size: 4096 }))
	}
};