module.exports = {
	name: "timers",
	description: "Check your own timers",
	execute({client, message}) {
		let authorTimers = "";
		client.timers.forEach(timer => {
			if(timer.user === message.author.id)
				authorTimers += `${timer.ID} : <t:${timer.reminderDate}:R> | ${timer.customMessage}\n`;
		});
		let sendText = "" === authorTimers ? `You have no timers` : `Your timers are:\n${authorTimers}`
		message.channel.send(sendText);
	}
};