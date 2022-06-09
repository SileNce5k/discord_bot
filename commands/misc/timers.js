module.exports = {
	name: "timer",
	description: "Check your own timers",
	execute({client, message}) {
		let authorTimers = "";
		client.timers.forEach(timer => {
			if(timer.user === message.author.id)
				authorTimers += `${timer.reminderDate}\n`;
		});
		message.channel.send(`Your timers are:\n${authorTimers}`);
	}
};