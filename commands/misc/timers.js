const sqlite3 = require('sqlite3').verbose();
module.exports = {
	name: "timers",
	description: "List all your timers.",
	async execute({message}) {
		let authorTimers = "";
		let sendText = "";

		const db = new sqlite3.Database('data/database.db');
		await new Promise((resolve, reject) => {
			db.all(`SELECT * FROM timers WHERE user = ? AND hasPassed = ?`, [message.author.id, false], function (error, timers){
				if(error){
					console.error("Error while trying to read timer from database: ", error)
					sendText = "An error occured while trying to read timer from database. Check console.";
					reject(error);
				}else{
					timers.forEach(timer => {
						if(timer.user === message.author.id)
							authorTimers += `${timer.ID} : <t:${timer.reminderTime.toFixed(0)}:R>\n`;
					});
					if(authorTimers === ""){
						sendText = "You have no timers set.";
					}else if(sendText === ""){
						sendText = `Your timers:\n${authorTimers}`;
					}
					resolve();
				}
			});
		
		});
		message.channel.send(sendText);
	}
};