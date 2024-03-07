module.exports = async function(userID) {
    let lastfmUsername = await new Promise((resolve, reject)=>{
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('data/database.db');
        db.get(
            `SELECT * FROM lastfm WHERE userID = ?`,
            [userID],
            (error, row) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    if (row == undefined) {
                        resolve(undefined);
                    }else{
                        resolve(row.lastfmUsername);
                    }
                }
                db.close();
            }
        );
    });
    return lastfmUsername;
}