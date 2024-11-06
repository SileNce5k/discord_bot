const sqlite3 = require('sqlite3').verbose();
module.exports = async function () { 
    const db = new sqlite3.Database('data/database.db');
    return new Promise ((resolve, reject)=>{
        db.run(
            `CREATE TABLE IF NOT EXISTS lastfm (
                        userID INTEGER PRIMARY KEY, 
                        lastfmUsername TEXT)`,
            (err) => {
                if (err) {
                    console.error(`Error while creating table 'lastfm': ${err}`);
                    reject(err);
                } else {
                    console.log("Table 'lastfm' created successfully.");
                    resolve();
                }
                db.close();
            }
        );
    })
}