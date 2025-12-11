const update = require('../../util/update')

module.exports = {
	name: 'update',
	description: 'pull changes from remote and reload commands with git',
	admin: true,
	execute({message, client, bot}) { 
		let sendText = update(client, bot);
		message.channel.send(sendText);
		
	}
};