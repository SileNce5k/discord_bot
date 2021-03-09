const prettyMS = require('pretty-ms')

module.exports = {
	name: 'uptime',
	description: 'Returns how long discord bot has been running',
	execute(message, client) {
        message.channel.send(`${prettyMS(client.uptime, {verbose: true})}`)
        
	}
};