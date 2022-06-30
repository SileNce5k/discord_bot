const sendTimerReminder = require('./sendTimerReminder')
const fs = require('fs')
module.exports = function (client) {
	const checkTimer = require('./checkTimer')

	for(let i = 0; i < client.timers.length; i++){
		if(parseInt(client.timers[i].reminderDate) <= Math.floor(new Date() / 1000)){
			sendTimerReminder(client, client.timers[i]);
			client.timers.splice(i, 1);
			i--
			fs.writeFileSync('data/timers.json', JSON.stringify(client.timers, null, 4))
		}
	}
	setTimeout(checkTimer, 1000, client);
}
