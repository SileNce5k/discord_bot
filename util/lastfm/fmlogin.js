const sqlite3 = require('sqlite3').verbose();
module.exports = async function(userID, lastfmUsername) {
    let sendText = "";
    // If the user already has a last.fm username set, just update it.
    let entryExists = await new Promise((resolve, reject)=>{
        const db = new sqlite3.Database('data/database.db');
        db.get(
            `SELECT * FROM lastfm WHERE userID = ?`,
            [userID],
            (error, row) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    resolve(row);
                }
                db.close();
            }
        );
    });
    if (!entryExists) {

        sendText = await new Promise((resolve, reject)=>{
            const db = new sqlite3.Database('data/database.db');
            
            db.run(
                `INSERT INTO lastfm (userID, lastfmUsername) VALUES (?, ?)`,
                [userID, lastfmUsername],
                function (error) {
                    if (error) {
                        console.error(error);
                        let sendText = "Error while adding last.fm username. Check console.";
                        reject(sendText);
                    } else {
                        let sendText = `Your last.fm username has been set to '${lastfmUsername}'.`;
                        console.log(sendText);
                        resolve(sendText);
                    }
                    db.close();
                }
            );
        });
    }else {
        sendText = await new Promise((resolve, reject)=>{
            const db = new sqlite3.Database('data/database.db');
            db.run(
                `UPDATE lastfm SET lastfmUsername = ? WHERE userID = ?`,
                [lastfmUsername, userID],
                function (error) {
                    if (error) {
                        console.error(error);
                        let sendText = "Error while updating last.fm username. Check console.";
                        reject(sendText);
                    } else {
                        let sendText = `Your last.fm username has been updated to '${lastfmUsername}'.`;
                        console.log(sendText);
                        resolve(sendText);
                    }
                    db.close();
                }
            );
        });
    }
    return sendText;
}