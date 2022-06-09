module.exports = {
	name: "timers",
	description: "Check your own timers",
	execute({client, message}) {
		let authorTimers = "";
		client.timers.forEach(timer => {
			if(timer.user === message.author.id)
				authorTimers += `<t:${timer.reminderDate}\n`;
		});
		message.channel.send(`Your timers are:\n${authorTimers}:R>`);
	}
};