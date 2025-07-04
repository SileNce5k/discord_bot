const savePresence = require("../../util/savePresence");
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
			  ,"${guilds},${prefix},${uptime},{members}"],
	admin: true,
	execute({message, client, args, prefix}) {
		let forceUpdate = false;
		if(args.length > 1 && args[0] === "force") {
			forceUpdate = true;
			args.shift();
		}
		if(args.length < 1){
			message.channel.send(`You need at least two arguments for this command, see \`${prefix}help setpresence\``)
			return;
		}
		let presenceType = args[0].toLocaleUpperCase();
		let sendText = "Presence has been set.";
		
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
			savePresence(presenceType, presenceText, client);
			if(forceUpdate) 
				setPresence({presenceText, presenceType, client})
			else
				sendText = `${sendText} It will update <t:${Math.floor((client.lastPresenceUpdate + 60000) / 1000)}:R>`
		}
		message.channel.send(sendText);
	
	
	}
};