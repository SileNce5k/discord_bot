module.exports = {
	name: 'say',
	description: 'Repeats arguments',
	execute({message, args}) {

		if(args.length == 0)
			message.channel.send("Can't send empty message");
		else{
			message.channel.send(args.join(" "))
			try{
				message.delete()
			}catch{
				console.log(this.name, ": An error happened while trying to delete the original message.\nProbably because of permissions.")
			}
		}
		
	}
};