const fs = require('fs');
const parseTime = require('./parseTime');

module.exports = function (client, message, args, compatibility) {
	if (args.length < 2)
		return message.channel.send("Please specify a time, and a message to send after the timer has finished");
	let currentUnixTime = Math.floor(new Date() / 1000);
	let timeInSeconds = compatibility ? parseTime(args[0], currentUnixTime) : parseTime(args[1], currentUnixTime);
	if (isNaN(timeInSeconds)) {
		return message.channel.send("Please specify a time, and a message to send after the timer has finished")
	}
	let customMessage = compatibility ? args.slice(1).join(" ") : args.slice(2).join(" ");
	let reminderTime = currentUnixTime + timeInSeconds
	let newTimerID = ++client.lastTimerID;
	const newTimer = {
		"ID": newTimerID,
		"user": `${message.author.id}`,
		"reminderDate": reminderTime,
		"channel": `${message.channel.id}`,
		"customMessage": `${customMessage}`
	}
	fs.writeFileSync('data/lastTimerID.txt', newTimerID.toString());
	client.timers.push(newTimer);
	fs.writeFileSync('data/timers.json', JSON.stringify(client.timers, null, 4))
	return `A new timer with ID:${newTimerID} created.\nI will remind you <t:${reminderTime.toFixed(0)}:R> (<t:${reminderTime.toFixed(0)}:f>)`
}
