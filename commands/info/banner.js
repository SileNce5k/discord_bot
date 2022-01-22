

module.exports = {
	name: 'banner',
	description: 'Returns server banner',
	execute({message}) {

		if(message.guild.bannerURL())
			message.channel.send(message.guild.bannerURL({format: 'png', size: 4096}))
		else
			message.channel.send("There is no banner.")
	}
};