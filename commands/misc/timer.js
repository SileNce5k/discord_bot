module.exports = {
	name: "timer",
	description: "Set a timer for a time in minutes.",
	moreHelp: ["Usage","<prefix>timer <time_in_minutes> <message_to_send>", "Bot will mention you after the time has passed, with the custom message."],
	execute({message, args}) {
		if(args.length < 2)
			return message.channel.send("Please specify a time in minutes, and a message to send after the timer has finished");
		let time = parseInt(args[0]);
		if(isNaN(time))
			return message.channel.send("Specify a time in number of minutes");
		time = time * 60000;
		let sendText = args.slice(1).join(" ");
		setTimeout(function(){
			message.channel.send(`<@${message.author.id}>, ${sendText}`);
		}, time);
		message.channel.send(`I will remind you in <t:${Math.floor(new Date() / 1000) + (time / 1000)}:R>`);
	}
};