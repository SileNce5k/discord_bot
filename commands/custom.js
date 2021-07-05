const addCustomCommand = require("../util/addCustomCommand");
const deleteCustomCommand = require("../util/deleteCustomCommand");
const getAllCustomCommands = require("../util/getAllCustomCommands");
const getOwnerOfCustomCommand = require("../util/getOwnerOfCustomCommand");
const Discord = require('discord.js');
const fs = require('fs');
const editCustomCommand = require("../util/editCustomCommand");

module.exports = {
	name: 'custom',
	description: 'Add custom commands, see <prefix>help custom for more',
	moreHelp: ["<prefix>custom add - Add new custom commands",
			   "<prefix>custom edit - Edit an existing command that you own",
			   "<prefix>custom remove - Delete your custom commands.",
			   "<prefix>custom owner - check owner of custom command",
			   "<prefix>custom list - list all custom commands",
			   "<prefix>custom variables - list all variables you can use"				
],
	execute({message, args, client, prefix}) {
		const customPath = './data/customCommands.json';
		if(!fs.existsSync(customPath)){
			fs.writeFileSync(customPath,"[]")
		}
		let sendText;
		if (args){
			let customName = args[1];
			let customMessage = args.slice(2, args.length).join(" ");
		switch (args[0].toLowerCase()) {
			case "add":
				sendText = addCustomCommand(args[1], customMessage, message.author.id);
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
					sendText = `The owner of ${customName} is ${user.user.username} (id: ${user.user.id}).`
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
			case "variables":
				sendText = "The variables you can use are:\n<prefix>\n<globalPrefix>\n<username>\n<nickname>\n<user_id>\n<discriminator>\n<guild_name>\n<guild_id>"
				break;
			case "edit":
				sendText = editCustomCommand(customName, message.author.id, customMessage)
				break;
			default:
				sendText = `Argument not recognized.\n"${prefix}help custom" to see all arguments you can use.`
				break;
		}
	}

		message.channel.send(sendText);
	}
};