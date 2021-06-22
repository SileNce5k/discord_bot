module.exports = {
	name: 'setPresence', 
	description: 'Set the presence for the bot',
	admin: true,
	execute({message, client, args}) { 

		let presenceType = args[0].toLocaleUpperCase();
		if(presenceType != "PLAY" || presenceType != "LISTEN" || presenceType != "WATCH") return;

		args = args.slice(args[0].length, args.length)
		let presenceText = args.join(" ");
		client.user.setActivity(presenceText, { type: presenceType });
		message.channel.send("Updated presence.")
	}
};