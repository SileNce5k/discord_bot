const sqlite3 = require('sqlite3').verbose();

module.exports = async function (bot) {
    const db = new sqlite3.Database('data/database.db');
    return new Promise ((resolve, reject)=>{
        db.run(
            `CREATE TABLE IF NOT EXISTS timers (
                        ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                        user TEXT, 
                        reminderTime INTEGER, 
                        channel TEXT, 
                        customMessage TEXT, 
                        hasPassed INTEGER)`,
            (err) => {
                if (err) {
                    bot.error(`Error while creating table 'timers': ${err}`);
                    reject(err);
                } else {
                    bot.log("Table 'timers' created successfully.");
                    resolve();
                }
                db.close();
            }
        );
    })
}
