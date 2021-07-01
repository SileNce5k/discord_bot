module.exports = {
	name: 'ping',
	description: 'Just ping.',
	execute({message, client}) {
		message.channel.send(`Pong.\n${client.ws.ping}ms`)
	}
};