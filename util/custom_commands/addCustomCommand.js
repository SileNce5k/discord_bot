const sqlite3 = require('sqlite3').verbose();
module.exports = async function(client, customName, customMessage, author){
	
	let sendText = "";
	let isExists = client.customCommands.get(customName);
	
	if (!isExists) {
		const db = new sqlite3.Database("data/database.db");
		sendText = await new Promise((resolve, reject)=>{
			
			db.run(`INSERT INTO customCommands (
				customName, 
				customMessage, 
				author, 
				isDeleted
				) VALUES (?, ?, ?, ?)`, [customName, customMessage, author, false],
				
				function(error){
					if(error){
						console.error(error)
						let sendText = "Error while inserting new custom command.";
						reject(sendText);
					}else{
						client.customCommands.set(customName, customMessage)
						let sendText = `New custom command with the name "${customName}" added`
						resolve(sendText)
					}
				})
		})
		db.close();
	}
	return sendText;
}