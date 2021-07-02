module.exports = {
	name: 'setpresence', 
	description: 'Set the presence for the bot',
	moreHelp: ["Presence types you can use:","PLAY, LISTEN, WATCH","Presence type have to be the first argument"],
	admin: true,
	execute({message, client, args, globalPrefix}) { 
		const savePresence = require("../util/savePresence");
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
		let regex = /<prefix>/g
		let presenceText = temp.slice(firstArg, temp.length)
		client.user.setActivity(presenceText.replace(regex, globalPrefix), { type: presenceType });
		savePresence(presenceType, presenceText);
		message.channel.send("Updated presence.")
	}else return;
	
	}
};