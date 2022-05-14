module.exports = {
	name: "timer",
	description: "Set a timer for a time in minutes. Bot will mention you and the custom message after time has passed.",
	execute({message, args}) {
		if(args.length < 2)
			return message.channel.send("Please specify a time in minutes, and a message to send after the timer has finished");
		let time = args[0] * 60000;
		let sendText = args.slice(1).join(" ");
		setTimeout(function(){
			message.channel.send(`<@${message.author.id}>, ${sendText}`);
		}, time);
		message.channel.send(`I will remind you in ${time / 60000} minutes`);
	}
};