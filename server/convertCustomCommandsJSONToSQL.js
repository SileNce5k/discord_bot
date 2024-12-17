const sqlite3 = require('sqlite3').verbose();
module.exports = async function () {
    const customCommands = require('../data/customCommands.json')
    const db = new sqlite3.Database('data/database.db');
    return new Promise((resolve, reject) => {
        customCommands.forEach(command => {
            const isDeleted = false;

            db.run(`INSERT INTO customCommands (
                customName, 
                customMessage, 
                author, 
                isDeleted
                ) VALUES (?, ?, ?, ?)`, [command.customName, command.customMessage, command.author, isDeleted], function (error) {
                if (error) {
                    console.error(`Error while converting customCommands.json to SQL: ${error}`)
                    reject(error);
                }
            }) 


        });

        db.close();
        console.log("Converted customCommands.json to SQL successfully.");
        resolve();
    })
}
