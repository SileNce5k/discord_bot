const randomNumber = require("../../util/randomNumber");

module.exports = {
	name: 'ask',
	description: 'Repeats arguments',
	execute({message}) {
		let answer = randomNumber(0, 1) === 1 ? "Yes" : "No";
		message.channel.send(answer)
	}
};