const sqlite3 = require('sqlite3').verbose();

module.exports = async function () {
    const db = new sqlite3.Database('data/database.db');
    return new Promise ((resolve, reject)=>{
        db.run(
            `CREATE TABLE IF NOT EXISTS customCommands ( 
                        customName TEXT, 
                        customMessage TEXT, 
                        author TEXT)`,
            (err) => {
                if (err) {
                    console.error(`Error while creating table 'customCommands': ${err}`);
                    reject(err);
                } else {
                    console.log("Table 'customCommands' created successfully.");
                    resolve("Success!");
                }
                db.close();
            }
        );
    })
}
