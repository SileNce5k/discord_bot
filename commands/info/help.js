const fs = require('fs');
const {EmbedBuilder} = require('discord.js');
const getSubdirFiles = require('../../util/getSubdirFiles');


module.exports = {
	name: 'help',
	description: 'List all available commands.',
	moreHelp: ["Examples:","`<prefix>help` will return help with a small description for each command",
			   "`<prefix>help <another_command>` will return help with a more descriptive description",
			   "The descriptive description isn't available on all commands",
			   "`<prefix>help netmodules` to display help for netmodules"
	],
	execute({ message, args, prefix, client }) {
		let commands = ""
		let commandFiles = getSubdirFiles('commands/')
		let x = false;
		let fieldName = "General";
		if (args[0] == "netmodules") {
			commandFiles = fs.readdirSync('../../netload').filter(file => file.endsWith('.js'));
			if (commandFiles.length == 0) {
				message.channel.send("There are no netmodules currently loaded.")
				x = true;
			}
			
		}
		if (x) return;

		const embed = new EmbedBuilder()
			.setColor(15780145)
			.setTitle("Commands")
			.setTimestamp()
			.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, size: 4096 }))

		for (const file of commandFiles) {
			const command = require(`../../${file}`);
			if(command.disabled) continue;

			if (args[0] == "admin") {
				if (command.admin)
					commands = commands + `${prefix}${command.name} | ${command.description}\n`
			}else if(!args[0]){
				if (!command.admin)
					commands = commands + `${prefix}${command.name} | ${command.description}\n`
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
			message.channel.send({embeds :[embed]});
	},
};