const fs = require('fs');
const Discord = require('discord.js');


module.exports = {
    name: 'help',
    description: 'List all available commands.',
    execute({message, args, prefix}) {
        var commands = " "
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        const embed = new Discord.MessageEmbed()
            .setColor(15780145)
            .setTitle("Commands")
            .setTimestamp()
            .setAuthor("soilens bot", "https://cdn.discordapp.com/avatars/481128222147477506/1a30f57f8e403f54aaca502012aeff14.png?size=2048")


        for (const file of commandFiles) {
            const command = require(`./${file}`);


            if(args[0] == "admin"){
                if (command.admin && !command.disabled)
                    commands = commands + `${prefix}${command.name} | ${command.description}\n`
            }else
                if(!command.admin && !command.disabled)
                commands = commands + `${prefix}${command.name} | ${command.description}\n`
        }
        embed.addFields(
            { name: "General", value: commands },
        )

        message.channel.send(embed);
    },
};

