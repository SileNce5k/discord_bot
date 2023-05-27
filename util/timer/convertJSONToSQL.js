const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
module.exports = async function () {
    const timers = require('../../data/timers.json')
    const db = new sqlite3.Database('data/database.db');
    return new Promise((resolve, reject) => {
        for (let i = 0; i < timers.length; i++) {
            let user = timers[i].user;
            let reminderTime = timers[i].reminderDate;
            let channel = timers[i].channel;
            let customMessage = timers[i].customMessage;
            let hasPassed = false;

            db.run(`INSERT INTO timers (
                user, 
                reminderTime, 
                channel, 
                customMessage, 
                hasPassed
                ) VALUES (?, ?, ?, ?, ?)`, [user, reminderTime, channel, customMessage, hasPassed], function (error) {
                if (error) {
                    console.error(`Error while converting timers.json to SQL: ${error}`)
                    reject(error);
                }
            }) 


        }
        db.close();
        console.log("Converted timers.json to SQL successfully.");
        resolve();
    })
}
