const addCustomCommand = require("../util/addCustomCommand");
const deleteCustomCommand = require("../util/deleteCustomCommand");
const getAllCustomCommands = require("../util/getAllCustomCommands");
const getOwnerOfCustomCommand = require("../util/getOwnerOfCustomCommand");
const Discord = require('discord.js');

module.exports = {
	name: 'custom',
	description: 'Add custom commands, see <prefix>help custom for more',
	moreHelp: ["<prefix>custom add - Add new custom commands",
			   "<prefix>custom remove - Delete your custom commands.",
			   "<prefix>custom owner - check owner of custom command",
			   "<prefix>custom list - list all custom commands"				
],
	execute({message, args, client}) {
		let sendText;
		if (args){
			let customName = args[1];
			let customMessage = args.slice(2, args.length).join(" ");
		switch (args[0].toLowerCase()) {
			case "add":
				sendText = addCustomCommand(args[0], customMessage, message.author.id);
				break;
			case "remove":
			case "delete":
				sendText = deleteCustomCommand(customName, message.author.id);
				break;
			case "owner":
				let author = getOwnerOfCustomCommand(customName);
				let user;
				if(!author) 
					sendText = `${customName} does not exist`
				else{
					client.guilds.cache.each(guild => {
						user = guild.members.cache.get(author);
					});
					sendText = `The owner of ${customName} is ${user.user.username}`
				}
				
				break;
			case "list":
				const embed = new Discord.MessageEmbed();
				sendText = getAllCustomCommands();
				if(sendText != ""){
				embed.setColor(15780145)
				embed.addFields(
					{ name: "Custom commands", value: sendText },
				)
				sendText = embed
				}else sendText = "NO CUSTOM COMMANDS"
				break;
			default:
				sendText = "Argument not recognized."
				break;
		}
	}

		message.channel.send(sendText);
	}
};