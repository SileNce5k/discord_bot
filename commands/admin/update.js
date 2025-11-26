const update = require('../../util/update')

module.exports = {
	name: 'update',
	description: 'pull changes from remote and reload commands with git',
	admin: true,
	execute({message, client}) { 
		let sendText = update(client);
		message.channel.send(sendText);
		
	}
};