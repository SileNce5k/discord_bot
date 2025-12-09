const parseMention = require('../../util/parseMention');
module.exports = {
    name: 'banner',
    description: 'Shows the banners of a user',
    async execute({message, args, client}) {
		let info;
		if (!args[0]) {
			info = message.author.id;
		} else {
			info = parseMention(args[0], message.guild);
		}
        if(info === ""){
            message.channel.send("Invalid user");
            return;
        }
		let forceFetchedUser = await client.users.fetch(info, {force: true});
        let banner = forceFetchedUser.bannerURL({dynamic: true, size: 4096});
        if(banner == null){
            message.channel.send("User does not have a banner");
        } else {
            message.channel.send(banner);
        }
    }
};