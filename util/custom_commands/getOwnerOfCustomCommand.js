
const sqlite3 = require('sqlite3').verbose();
module.exports = async function(customName){
	const db = new sqlite3.Database("data/database.db");

	let author = await new Promise((resolve, reject)=>{
		db.get("SELECT * FROM customCommands WHERE customName = ? AND isDeleted = 0", [customName], 
			function(error, command){
			if(error){
				console.error(error)
				let author = "Error when getting the owner of this custom command. Check console.";
				reject(author)
			}else {
				let author;
				if(command){
					author = command.author;
				}
				resolve(author)
			}
		})
	})

	return author;
}