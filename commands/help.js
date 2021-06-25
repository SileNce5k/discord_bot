const fs = require('fs');
const Discord = require('discord.js');


module.exports = {
	name: 'help',
	description: 'List all available commands.',
	moreHelp: ["Examples:","<prefix>help will return help with a small description for each command",
			   "<prefix>help <another_command> will return help with a more descriptive description",
			   "The descriptive description isn't available on all commands"
	],
	execute({ message, args, prefix, client }) {
		var commands = " "
		let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		let x = 0
		if (args[0] == "netload") {
			commandFiles = fs.readdirSync('./netload').filter(file => file.endsWith('.js'));
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
			const command = require(`./${file}`);


			if (args[0] == "admin") {
				if (command.admin && !command.disabled)
					commands = commands + `${prefix}${command.name} | ${command.description}\n`
			}else if(!args[0]){
				if (!command.admin && !command.disabled)
					commands = commands + `${prefix}${command.name} | ${command.description}\n`
			}else if(args[0] === command.name){
				commands = commands + `${prefix}${command.name}\n`
				if(command.moreHelp){
				command.moreHelp.forEach(element => {
					commands = commands + `${element}\n`
				});
			} else {
				noHelp = 1;
			}
				break;
			}
		}
		let regex = /<prefix>/g
		if(commands === " "){
			noHelp = 1;
		}
		commands = commands.replace(regex, prefix)
		embed.addFields(
			{ name: "General", value: commands },
		)
		if(noHelp == 0)
			message.channel.send(embed);
		else
			message.channel.send("Either there is no command with that name, or there is no specific help for it.")
	},
};

