const sqlite3 = require('sqlite3').verbose();
module.exports = async function (clientWhitelist) { 
    const db = new sqlite3.Database('data/database.db');
    await new Promise ((resolve, reject)=>{
        db.run(
            `CREATE TABLE IF NOT EXISTS whitelist (
                        Id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        serverId TEXT, 
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
    loadWhitelist(clientWhitelist);
}

async function loadWhitelist(clientWhitelist) {
	const db = new sqlite3.Database('data/database.db');
	let rows = await new Promise((resolve) => {
		db.all(`SELECT * FROM whitelist`, function (error, rows){
			if(error){
				console.error("Failed to read whitelist table")
				console.error(error);
				resolve([]);
			}else{
				resolve(rows);
			}
		});
	});
	rows.forEach(row => {
		if(clientWhitelist.has(row.serverId)){
			let oldEntry = clientWhitelist.get(row.serverId);
			oldEntry.push(row.command)
			clientWhitelist.set(row.serverId, oldEntry)
		}else {
			clientWhitelist.set(row.serverId, [row.command])
		}
	});
}