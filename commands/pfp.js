const parseMention = require("../util/parseMention.js")

module.exports = {
	name: 'pfp',
	description: 'Returns profile picture',
	execute({message, args}) {
		let info;
        if (!args[0]) {
            info = message.author.id;
        } else {
            info = parseMention(args[0], message.guild);
            console.log(info)
        }
        let user = message.guild.members.cache.get(info);

        message.channel.send(user.user.avatarURL({ format: 'png', dynamic: true, size: 4096 }))
	}
};