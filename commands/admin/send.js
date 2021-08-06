module.exports = {
	name: 'send',
	description: 'Send a message to a specific channel',
	admin: true,
	execute({client, args}){
		let channel = args[0];
		let message = args.slice(1, args.length)
		message = message.join(" ")
		client.channels.cache.get(channel).send(message)
	}
}