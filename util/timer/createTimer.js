const parseTime = require('./parseTime');
const timeUntil = require('./timeUntil');
const sqlite3 = require('sqlite3').verbose();
module.exports = async function (message, args) {
	const databasePath = 'data/database.db'
	if (args.length < 2)
		return "Please specify a time, and a message to send after the timer has finished";
	let currentUnixTime = Math.floor(new Date() / 1000);

	let timeInSeconds;
	if(!isNaN(Date.parse(args[0])) && isNaN(parseTime(args[0], currentUnixTime))){
		timeInSeconds = timeUntil(args[0]).totalInSeconds;
		if(timeInSeconds < 0){
			return "The date must not be in the past."
		}
	}else {
		timeInSeconds = parseTime(args[0], currentUnixTime);
	} 
	if (isNaN(timeInSeconds)) {
		return "Please specify a time, and a message to send after the timer has finished"
	}
	const customMessage = args.slice(1).join(" ")
	const reminderTime = currentUnixTime + timeInSeconds
	let newTimerID;
	const db = new sqlite3.Database(databasePath)
	let sendText = await new Promise((resolve, reject)=>{
		db.run(`INSERT INTO timers (
			user, 
			reminderTime, 
			channel, 
			customMessage, 
			hasPassed
			) VALUES (?, ?, ?, ?, ?)`, 
			[
				message.author.id, 
				reminderTime, 
				message.channel.id, 
				customMessage, 
				false
			], function (error) {
			if (error) {
				console.error(error)
				let sendText = "Error while creating the timer. Check console.";
				reject(sendText);
			}else{
				let lastRowID = this.lastID;
				db.get(
					`SELECT id FROM timers WHERE rowid = ?`,
					lastRowID,
					function (error, row) {
						if (error) {
							let sendText = "Error while getting the ID of the new timer. Check console.";
							console.error(error);
							reject(sendText);
						} else {
							newTimerID = row.ID;
							let sendText = `A new timer with ID:${newTimerID} created.\nI will remind you <t:${reminderTime.toFixed(0)}:R> (<t:${reminderTime.toFixed(0)}:f>)`
							console.log(`New timer with ID:${newTimerID} created.`);
							resolve(sendText);
						}
					}
				);
			}
	
		});
	})
	console.log(sendText);
	db.close();


	return sendText;
}
