module.exports = {
	name: "servericon",
	description: "Send the server icon",
	execute({message}){
		message.channel.send(message.guild.iconURL({ dynamic: true, size: 4096 }))
	}
}