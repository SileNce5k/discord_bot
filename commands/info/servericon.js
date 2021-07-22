module.exports = {
	name: "servericon",
	description: "Send the server icon",
	execute({message, client}){
		message.channel.send(client.user.avatarURL({ dynamic: true, size: 4096 }))
	}
}