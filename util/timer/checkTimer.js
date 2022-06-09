const sendTimerReminder = require('./sendTimerReminder')
module.exports = function (client) {
	const checkTimer = require('./checkTimer')
	client.timers.forEach(timer => {
		if(parseInt(timer.reminderDate) <= Math.floor(new Date() / 1000)){
			sendTimerReminder(client, timer);
			client.timers.pop(timer);
		}
	});
	setTimeout(checkTimer, 1000, client);
}
