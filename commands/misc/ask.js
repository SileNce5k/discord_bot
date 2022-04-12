const randomNumber = require("../../util/randomNumber");

module.exports = {
	name: 'ask',
	description: 'Randomly answer with Yes, or No, or if you ask a question with "or" in it, answer with either statement before or after "or"',
	execute({message, args}) {
		let answer = randomNumber(0, 1) === 1 ? "Yes" : "No";
		if(args.length > 2 && args.includes("or")){
			let question = args.join(" ").split("or ");
			answer = randomNumber(0, 1) === 1 ? question[0] : question[1];
		}
		message.channel.send(answer)
	}
};