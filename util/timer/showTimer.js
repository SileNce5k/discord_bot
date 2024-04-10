const sqlite3 = require('sqlite3').verbose();
module.exports = async function (authorID, timerID) {
    const databasePath = `data/database.db`;
    const db = new sqlite3.Database(databasePath);
    let sendText = "";
    await new Promise((resolve, reject) => {
        db.get(`SELECT * FROM timers WHERE ID = ?`, [timerID],
        function (error, timer){
            if(error){
                sendText = "An error occured while trying to read timer from database. Check console.";
                console.error("Error while trying to read timer from database: ", error)
                reject(error);
            }else{
                if(authorID !== timer.user){
                    sendText = "This timer does not belong to you."
                }
                else if(timer === undefined){
                    sendText = "Timer not found";
                }else{
                    sendText = `${timer.ID} will remind you <t:${timer.reminderTime.toFixed(0)}:R> (<t:${timer.reminderTime.toFixed(0)}:f>), with the message being:\n${timer.customMessage}`;
                }
                resolve();
            }
        })
    })
    db.close();
    return sendText;
}
