module.exports = {
	name: 'say',
	description: 'Repeats arguments',
	admin: true,
	execute({message, args}) {

		if(args.length == 0)
			message.channel.send("Can't send empty message");
		else{
			message.channel.send(args.join(" "))
		}
		
	}
};