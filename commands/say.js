module.exports = {
	name: 'say',
	description: 'Repeats arguments',
	execute(message, args) {
		message.channel.send(args.join(" "))
	}
};