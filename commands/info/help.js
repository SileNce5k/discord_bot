const fs = require('fs');
const Discord = require('discord.js');
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
		let x = 0
		if (args[0] == "netmodules") {
			commandFiles = fs.readdirSync('../../netload').filter(file => file.endsWith('.js'));
			if (commandFiles.length == 0) {
				message.channel.send("There are no netmodules currently loaded.")
				x = 1;
			}
			
		}
		if (x == 1) return;

		const embed = new Discord.MessageEmbed()
			.setColor(15780145)
			.setTitle("Commands")
			.setTimestamp()
			.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, size: 4096 }))

		let noHelp = 0;
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
					//commands = command.description;
					noHelp = 1;
				}
				break;
			}
		}
		let regex = /<prefix>/g
		commands = commands.replace(regex, prefix)
		embed.addFields(
			{ name: " ", value: commands },
		)
		if(commands === false){
			message.channel.send("There is no command with that name");
		}
		else if(noHelp == 0){
			message.channel.send({embeds :[embed]});
		}
		else {
			/*embed.addFields(
				{name: "Help", value: commands}
			)*/
			message.channel.send({embeds :[embed]})
		}
		
	},
};