const sqlite3 = require('sqlite3').verbose();
module.exports = async function (authorID, timerID) {
    const db = new sqlite3.Database('data/database.db')
    let sendText = "";
    await new Promise((resolve, reject) => {
        db.all('SELECT * FROM timers WHERE id = ? AND user = ? AND hasPassed = ?', [parseInt(timerID), authorID, false], (err, rows) => {
            if (err) {
                console.error(err);
                return;
            }
            if (rows.length > 1) {
                sendText = "More than one timer has this ID"
            } else if (rows.length === 0) {
                sendText = `A timer with the ID ${timerID} was not found.\n`
            } else {
                db.run('UPDATE timers SET hasPassed = ? WHERE ID = ? AND user = ?', [true, parseInt(timerID), authorID], function (err) {
                    if (err) {
                        console.error(err);
                        sendText = "Updating timers failed. Check console.";
                        reject(sendText);
                    }
                    else {
                        sendText = `Timer with ID:${timerID} deleted.`;
                        resolve(sendText);
                    }
                });
            }

        });
    })

    db.close();
    return sendText;
}
