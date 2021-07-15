const randomNumber = require('../util/randomNumber')

module.exports = {
	name: 'random',
	description: 'Returns a value between two numbers (default = 1-10)',
	execute({ message, args }) {
		let min = 1
		let max = 10
		if (args[0] && args[1]) {
			min = parseInt(args[0])
			max = parseInt(args[1])
		}
		let randNumber= randomNumber(min,max)
		message.channel.send(randNumber)
	}
};