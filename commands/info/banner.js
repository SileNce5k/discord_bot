

module.exports = {
	name: 'banner',
	description: 'Returns server banner',
	execute({message}) {

		let bannerURL = message.guild.bannerURL({format: 'png', size: 4096});
		console.log(bannerURL)
		if(bannerURL)
			message.channel.send(bannerURL)
		else
			message.channel.send("There is no banner.")
	}
};