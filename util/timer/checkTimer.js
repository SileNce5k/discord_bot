const sendTimerReminder = require('./sendTimerReminder')
const sqlite3 = require('sqlite3').verbose();
module.exports = async function (client) {
	const checkTimer = require('./checkTimer')
	const db = new sqlite3.Database('data/database.db')
	let currentUnixTime = Math.floor(new Date() / 1000);
	await new Promise((resolve, reject) => {
		db.get(
			`SELECT * FROM timers WHERE reminderTime <= ? AND hasPassed = ?`,
			[currentUnixTime, false],
			function (error, timer) {
				if (error) {
					console.error(error);
					reject(error);
				} else {
					if (timer !== undefined) {
						db.run(`UPDATE timers SET hasPassed = ? WHERE ID = ?`, [true, timer.ID],
							function (error) {
								if (error) {
									console.error(`Error while updating ${timer.ID} setPassed to true`, error);
									reject(error);
								} else {
									console.log(`Updated ${timer.ID}, set hasPassed to true.`);
								}
							})
						sendTimerReminder(client, timer);
					}

					db.close();
					resolve();
				}
			}
		);
	})
	setTimeout(checkTimer, 1000, client);
}
