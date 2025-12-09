module.exports = {
	name: 'send',
	description: 'Send a message to a specific channel',
	admin: true,
	execute({client, args, bot}){
		let channel = args[0];
		let message = args.slice(1, args.length)
		message = message.join(" ")
		try{
			client.channels.cache.get(channel).send(message)
		}catch(err){
			bot.error(`An error occurred while trying to send a message to ${channel}`,err);
			message.channel.send("An error occurred while trying to send a message to that channel.\nCheck console for details.");
		}
	}
}