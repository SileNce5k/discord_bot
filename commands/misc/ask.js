const randomNumber = require("../../util/randomNumber");

module.exports = {
	name: 'ask',
	description: 'Randomly answer with Yes, or No',
	execute({message}) {
		let answer = randomNumber(0, 1) === 1 ? "Yes" : "No";
		message.channel.send(answer)
	}
};