

module.exports = {
	name: 'banner',
	description: 'Returns server banner',
	execute({message}) {

		if(message.guild.bannerURL({size: 4096}))
			message.channel.send(message.guild.bannerURL())
		else
			message.channel.send("There is no banner.")
	}
};