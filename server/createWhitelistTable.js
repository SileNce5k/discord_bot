const sqlite3 = require('sqlite3').verbose();
module.exports = async function () { 
    const db = new sqlite3.Database('data/database.db');
    return new Promise ((resolve, reject)=>{
        db.run(
            `CREATE TABLE IF NOT EXISTS whitelist (
                        serverId TEXT PRIMARY KEY, 
                        command TEXT,
                        dateAdded INTEGER)`,
            (err) => {
                if (err) {
                    console.error(`Error while creating table 'whitelist': ${err}`);
                    reject(err);
                } else {
                    console.log("Table 'whitelist' created successfully.");
                    resolve();
                }
                db.close();
            }
        );
    })
}