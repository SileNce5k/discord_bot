const setPresence = require("../../util/setPresence");

module.exports = {
	name: 'setpresence', 
	description: 'Set the presence for the bot',
	moreHelp: ["Presence types you can use:"
			  ,"PLAY, LISTEN, WATCH, CUSTOM, COMPETING"
			  ,"Presence type have to be the first argument"
			  ,"Example: `<prefix>setpresence watch ${guilds} servers`", 
			  ,"Updates once a minute if custom variables are used."
			  ,""
			  ,"Custom Variables:"
			  ,"${guilds},${prefix},${uptime}"],
	admin: true,
	execute({message, client, args, globalPrefix}) { 
		const savePresence = require("../../util/savePresence");
		let presenceType = args[0].toLocaleUpperCase();
		let sendText = "Updated presence";
		
		switch (presenceType) {
			case "PLAY":
				presenceType = 0;
				break;
			case "LISTEN":
				presenceType = 2;
				break;
			case "WATCH":
				presenceType = 3;
				break;
			case "CUSTOM":
				presenceType = 4;
				break;
			case "COMPETING":
				presenceType = 5;
				break;
			case "STREAM": 
				presenceType = 1;
				break;
			default:
				presenceType = "INVALID";
		}
		
		if(presenceType === "INVALID"){
			sendText = "Invalid presence type";
		} else {
			const firstArg = args[0].length + 1;
			let temp = args.join(" ");
			let presenceText = temp.slice(firstArg, temp.length)
			setPresence({presenceText: presenceText,presenceType: presenceType, client: client, globalPrefix: globalPrefix});
			savePresence(presenceType, presenceText, client);
		}
		message.channel.send(sendText);
	
	
	}
};