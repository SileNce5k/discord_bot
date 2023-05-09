const createTimer = require('../../util/timer/createTimer');
const deleteTimer = require('../../util/timer/deleteTimer');
const parseTime = require('../../util/timer/parseTime');
const fs = require('fs');
const showTimer = require('../../util/timer/showTimer');
module.exports = {
	name: "timer",
	description: "Set a timer for a time in minutes.",
	moreHelp: ["Usage:"
	,"`<prefix>timer <time_in_minutes> <message_to_send>`"
	,"`<prefix>timer <time>(d|h|m|s|t) <message_to_send>`"
	,"Bot will mention you after the time has passed, with the custom message."],
	execute({client, message, args}) {
		let sendText = "This should never happen.";

		switch (args[0]) {
			case "add":
			case "create":
				sendText = createTimer(client, message, args, false);
				break;
			case "edit":
				sendText = "not implemented yet"
				break;
			case "delete":
			case "remove":
				let timerID = args[1];
				sendText = deleteTimer(client, message.author.id, timerID);
				break;
			case "show":
				sendText = showTimer(client, message.author.id, args[1]);
			default:
				sendText = "not sure what you mean"
				if(!isNaN(parseTime(args[0], Math.floor(new Date() / 1000))))
					sendText = createTimer(client, message, args, true);
				break;
		}
		message.channel.send(sendText);
	}
};