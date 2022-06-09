const parseTime = require('../../util/timer/parseTime');
const fs = require('fs');
module.exports = {
	name: "timer",
	description: "Set a timer for a time in minutes.",
	moreHelp: ["Usage:"
	,"`<prefix>timer <time_in_minutes> <message_to_send>`"
	,"`<prefix>timer <time>(m|h|s) <message_to_send>`"
	,"Bot will mention you after the time has passed, with the custom message."],
	execute({client, message, args}) {
		if(args.length < 2)
			return message.channel.send("Please specify a time, and a message to send after the timer has finished");
		let currentUnixTime = Math.floor(new Date() / 1000);
		let timeInSeconds = parseTime(args[0]);
		if(isNaN(timeInSeconds)){
			return message.channel.send("Please specify a time, and a message to send after the timer has finished")
		}
		let customMessage = args.slice(1).join(" ");
		let reminderTime = currentUnixTime + timeInSeconds
		const newTimer = {
			"user": `${message.author.id}`,
			"reminderDate": reminderTime,
			"channel": `${message.channel.id}`,
			"customMessage": `${customMessage}`
		}
		client.timers.push(newTimer);
		fs.writeFileSync('data/timers.json', JSON.stringify(client.timers, null, 4))
		message.channel.send(`I will remind you <t:${reminderTime - 10}:R>`);
	}
};