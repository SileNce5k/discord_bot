module.exports = {
	name: 'setpresence', 
	description: 'Set the presence for the bot',
	admin: true,
	execute({message, client, args}) { 
		let presenceType = args[0].toLocaleUpperCase();
		if(presenceType == "PLAY" || presenceType == "LISTEN" || presenceType == "WATCH"){
		
		switch (presenceType) {
			case "PLAY":
				presenceType = "PLAYING";
				break;
			case "LISTEN":
				presenceType = "LISTENING";
				break;
			case "WATCH":
				presenceType = "WATCHING";
		}
		const firstArg = args[0].length + 1;
		let temp = args.join(" ");
		let presenceText = temp.slice(firstArg, temp.length)
		client.user.setActivity(presenceText, { type: presenceType });
		message.channel.send("Updated presence.")
	}else return;
	
	}
};