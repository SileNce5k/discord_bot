const addCustomCommand = require("../../util/custom_commands/addCustomCommand");
const deleteCustomCommand = require("../../util/custom_commands/deleteCustomCommand");
const getAllCustomCommands = require("../../util/custom_commands/getAllCustomCommands");
const getOwnerOfCustomCommand = require("../../util/custom_commands/getOwnerOfCustomCommand");
const renameCustomCommand = require("../../util/custom_commands/renameCustomCommand");
const {EmbedBuilder} = require('discord.js');
const fs = require('fs');
const editCustomCommand = require("../../util/custom_commands/editCustomCommand");

module.exports = {
	name: 'custom',
	description: "Manage custom commands, see <prefix>help custom for more",
	moreHelp: ["<prefix>custom add - Add new custom commands",
			   "<prefix>custom edit - Edit an existing command that you own",
			   "<prefix>custom rename - Rename an existing command that you own",
			   "<prefix>custom show - Show custom message unformatted.",
			   "<prefix>custom remove - Delete your custom commands.",
			   "<prefix>custom owner - check owner of custom command",
			   "<prefix>custom list - list all custom commands",
			   "<prefix>custom variables - list all variables you can use",
			   "<prefix>custom count - display the amount of custom commands"
],
	async execute({message, args, client, prefix, owners}) {
		let sendText;
		let isEmbed = false;
		if (args){
			let customName = args[1];
			let customMessage = args.slice(2, args.length).join(" ");
		
		switch (args[0].toLowerCase()) {
			case "add":{
				if(!customMessage) {
					message.channel.send("Message can't be empty");
					return;
				}
				sendText = await addCustomCommand(client, customName, customMessage, message.author.id);
				break;
			}
			case "remove":
			case "delete":{
				sendText = deleteCustomCommand(customName, message.author.id, owners);
				break;
			}
			case "owner":{
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
			}
			case "list": {
				const embed = new EmbedBuilder();
				sendText = getAllCustomCommands(client);
				if(sendText !== ""){
				embed.setColor(15780145)
				embed.addFields(
					{ name: "Custom commands", value: sendText },
				)
				sendText = embed
				isEmbed = true;
				}else sendText = "NO CUSTOM COMMANDS"
				break;
			}
			case "variables": {
				sendText = "The variables you can use are:\n<prefix>\n<globalPrefix>\n<username>\n<nickname>\n<user_id>\n<guild_name>\n<guild_id>"
				break;
			}
			case "edit": {
				sendText = editCustomCommand(customName, message.author.id, customMessage)
				break;
			}
			case "show": {
				let json = fs.readFileSync(customPath, 'utf8');
				let customCommands = JSON.parse(json)
				sendText = "Command not found."
				customCommands.forEach(function (customCommand) {
					if (customCommand.customName === customName) {
						sendText = `\`\`\`\n${customCommand.customMessage}\n\`\`\``
					}
				});
				break;
			}
			case "rename": {
				sendText = renameCustomCommand(customName, args[2], message.author.id);
				break;
			}
			case "count": {
				const customPath = './data/customCommands.json';
				let json = fs.readFileSync(customPath, 'utf8');
				let customCommands = JSON.parse(json)
				sendText = `There are ${customCommands.length} custom commands in total`;
				break;
			}
			default: {
				sendText = `Argument not recognized.\n"${prefix}help custom" to see all arguments you can use.`
				break;
			}
		}
	}
		if(isEmbed) message.channel.send({embeds :[sendText]})
		else message.channel.send(sendText);
	}
};