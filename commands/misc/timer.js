const createTimer = require('../../util/timer/createTimer');
const deleteTimer = require('../../util/timer/deleteTimer');
const parseTime = require('../../util/timer/parseTime');
const showTimer = require('../../util/timer/showTimer');
module.exports = {
	name: "timer",
	description: "Set a timer for a date or time duration.",
	moreHelp: ["Usage:"
	,"`<prefix>timer [add|create] <time_in_minutes> <message_to_send>`"
	,"`<prefix>timer <time>(d|h|m|s|t) <message_to_send>`"
	,"`<prefix>timer <future_date> <message_to_send>`"
	,"`<prefix>timer edit <timer_id> <new_time_in_minutes> <new_message_to_send>` (not implemented)"
	,"`<prefix>timer [delete|remove] <timer_id>`"
	,"`<prefix>timer show <timer_id>`"
	,"Bot will mention you after the time has passed, with the custom message."],
	async execute({message, args}) {
		let sendText = "This should never happen.";
		switch (args[0]) {
			case "add":
			case "create":
				args.shift()
				sendText = await createTimer(message, args);
				break;
			case "edit":
				sendText = "not implemented yet"
				break;
			case "delete":
			case "remove":
				let timerID = args[1];
				sendText = await deleteTimer(message.author.id, timerID);
				break;
			case "show":
				sendText = await showTimer(message.author.id, args[1]);
				break;
			default:
				sendText = "not sure what you mean";
				if(args.length < 2){
					sendText = "Please specify a time, and a message to send after the timer has finished";
					break;
				}
				if(!isNaN(parseTime(args[0], Math.floor(new Date() / 1000)) || !isNaN(args[0])))
					sendText = await createTimer(message, args);
				break;
		}
		message.channel.send(sendText);
	}
};