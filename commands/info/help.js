const fs = require('fs');
const {EmbedBuilder} = require('discord.js');
const getSubdirFiles = require('../../util/getSubdirFiles');


module.exports = {
	name: 'help',
	description: 'List all available commands.',
	moreHelp: ["Examples:","`<prefix>help [optional_page]` will return help with a small description for each command",
			   "`<prefix>help <another_command>` will return help with a more descriptive description",
			   "The descriptive description isn't available on all commands",
			   "`<prefix>help netmodules` to display help for netmodules"
	],
	execute({ message, args, prefix, client }) {
		let commands = ""
		let commandFiles = getSubdirFiles('commands/')
		let x = false;
		let fieldName = `Page [[page]]/${Math.round(client.commands.size / 10)}`;
		let iteration = 0;
		let num_in_args = false;
		let added_commands = 0;
		let page = -1;
		if (args[0] == "netmodules") {
			commandFiles = fs.readdirSync('../../netload').filter(file => file.endsWith('.js'));
			if (commandFiles.length == 0) {
				message.channel.send("There are no netmodules currently loaded.")
				x = true;
			}
		
		}else if(!isNaN(parseInt(args[0])) && parseInt(args[0])){
			num_in_args = true;
			iteration = ( parseInt(args[0]) - 1) * 10;
			page = Math.round(parseInt(args[0]))
		}
		if(page === -1){
			page = 1;
		}
		fieldName = fieldName.replace("[[page]]", page);
		const max_commands = iteration + 10;
		
		if (x) return;

		const embed = new EmbedBuilder()
			.setColor(15780145)
			.setTitle("Commands")
			.setTimestamp()
			.setAuthor({name: client.user.username, iconURL: client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 })})
		let start = 0;
		for (const file of commandFiles) {
			if(iteration >= max_commands) break;
			const command = require(`../../${file}`);

			if(command.disabled) continue;

			if (args[0] == "admin") {
				if (command.admin)
					commands = commands + `${prefix}${command.name} | ${command.description}\n`
			}else if(!args[0] || num_in_args){
				if (!command.admin){
					if(start < iteration){
					}else{
						added_commands++
						commands = commands + `${prefix}${command.name} | ${command.description}\n`;
						iteration++
					}
					start++;
				}
			}else if(args[0] === command.name){
				commands = commands + `${prefix}${command.name}\n`
				embed.setTitle(command.name.charAt(0).toUpperCase() + command.name.slice(1))
				if(command.moreHelp){
				command.moreHelp.forEach(element => {
					commands = commands + `${element}\n`
				});
				} else {
					fieldName = "Description";
					commands = commands + `${command.description}`;
				}
				break;
			}
		}
		if(commands === ""){
			fieldName = "Command not found";
			commands = "No command with that name found."
		}
		let regex = /<prefix>/g;
		commands = commands.replace(regex, prefix)
		embed.addFields(
			{ name: fieldName, value: commands },
		)
		if(embed.fields[0].value.length > 1023){
			message.channel.send(`There are more than 1023 characters`)
		}else {
			message.channel.send({embeds :[embed]});
		}
	},
};