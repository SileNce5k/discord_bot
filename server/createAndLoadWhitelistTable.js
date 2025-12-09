const sqlite3 = require('sqlite3').verbose();
module.exports = async function (clientWhitelist, bot) { 
    const db = new sqlite3.Database('data/database.db');
    await createGuildWhitelist(db, bot);
    await createUserWhitelist(db, bot);
    db.close();
    loadWhitelist(clientWhitelist, bot);
}

async function createGuildWhitelist(db, bot) {
    await new Promise ((resolve, reject)=>{
        db.run(
            `CREATE TABLE IF NOT EXISTS guild_whitelist (
                        Id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        guildId TEXT, 
                        command TEXT,
                        dateAdded INTEGER)`,
            (err) => {
                if (err) {
                    db.close();
                    bot.error(`Error while creating table 'guild_whitelist': ${err}`);
                    reject(err);
                } else {
                    bot.log("Table 'guild_whitelist' created successfully.");
                    resolve();
                }
            }
        );
    });
}
async function createUserWhitelist(db) {
    await new Promise ((resolve, reject)=>{
        db.run(
            `CREATE TABLE IF NOT EXISTS user_whitelist (
                        Id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        userId TEXT, 
                        command TEXT,
                        dateAdded INTEGER)`,
            (err) => {
                if (err) {
                    db.close();
                    bot.error(`Error while creating table 'user_whitelist': ${err}`);
                    reject(err);
                } else {
                    bot.log("Table 'user_whitelist' created successfully.");
                    resolve();
                }
            }
        );
    });
}

async function loadWhitelist(clientWhitelist) {
	const db = new sqlite3.Database('data/database.db');
	let guildRows = await new Promise((resolve) => {
		db.all(`SELECT * FROM guild_whitelist`, function (error, rows){
			if(error){
				bot.error("Failed to read guild_whitelist table")
				bot.error(error);
				resolve([]);
			}else{
				resolve(rows);
			}
		});
	});
    let userRows = await new Promise((resolve) => {
        db.all(`SELECT * FROM user_whitelist`, function (error, rows){
            if(error){
                bot.error("Failed to read user_whitelist table")
                bot.error(error);
                resolve([]);
            }
        })
    })
	guildRows.forEach(row => {
		if(clientWhitelist.guild.has(row.guildId)){
			let oldEntry = clientWhitelist.guild.get(row.guildId);
			oldEntry.push(row.command)
			clientWhitelist.guild.set(row.guildId, oldEntry)
		}else {
			clientWhitelist.guild.set(row.guildId, [row.command])
		}
	});
    userRows.forEach(row => {
		if(clientWhitelist.user.has(row.userId)){
			let oldEntry = clientWhitelist.user.get(row.userId);
			oldEntry.push(row.command)
			clientWhitelist.user.set(row.userId, oldEntry)
		}else {
			clientWhitelist.user.set(row.userId, [row.command])
		}
	});

    db.close();
}