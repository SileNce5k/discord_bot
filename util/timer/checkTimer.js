const sendTimerReminder = require('./sendTimerReminder')
const fs = require('fs')
module.exports = function (client) {
	const checkTimer = require('./checkTimer')
	client.timers.forEach(timer => {
		if(parseInt(timer.reminderDate) <= Math.floor(new Date() / 1000)){
			sendTimerReminder(client, timer);
			client.timers.pop(timer);
			fs.writeFileSync('data/timers.json', JSON.stringify(client.timers, null, 4))
		}
	});
	setTimeout(checkTimer, 1000, client);
}
