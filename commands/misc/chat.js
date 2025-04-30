require("dotenv").config();
const sqlite3 = require('sqlite3').verbose();

module.exports = {
	name: 'chat',
	description: 'A chat command that uses an LLM to answer your prompts (server must be whitelisted)',
	async execute({ message, args }) {
		// TODO: Externalize the whitelist checking into a the message function with a variable export. And cache it. 
		// Have a global collection that gets created on launch from the database, the collection uses the guild ID as a key and has an array of commands that are whitelisted.
		// Just write to both the database and this collection when a new command gets whitelisted.
		const db = new sqlite3.Database('data/database.db');
		let isWhitelisted = false;
		await new Promise((resolve, reject) => {
			db.get(`SELECT * FROM whitelist WHERE serverId = ? AND command = ?`, [message.guild.id, this.name],
			function (error, row){
				if(error){
					console.error(error);
					resolve("");
				}else{
					if(row === undefined){
						resolve();
					}else {
						isWhitelisted = true;
						resolve();
					}
				}
			})
		})

		if(!isWhitelisted){
			message.channel.send("This server is not whitelisted. The bot admin needs to whitelist the server for this command to work.");
			return;
		}
		if(args.length === 0){ 
			message.channel.send("You have to set your prompt in the arguments");
			return;
		}
		const prompt = args.join(" ");
		let answer = "";
		const initialMessage = await message.channel.send("Generating response... This may take a moment.")
        message.channel.sendTyping();
		await fetch(`https://openrouter.ai/api/v1/chat/completions`, {
			method: `POST`,
			headers: {
				"Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
				"Content-Type": `application/json`
			},
			body: JSON.stringify({
				"model": `deepseek/deepseek-chat-v3-0324:free`,
				"messages": [
					{
						"role": `user`,
						"content": prompt
					}
				],
				"max_tokens": 250
			})
		}).then(response => response.json()).then(data => {
			answer = data.choices[0].message.content;
		}).catch(error => {
			console.error(error);
		});
		if(answer.length > 0){
			if(answer.length > 1999){
				initialMessage.edit("Unfortunately the length of the message was longer than what discord allows.")
			}
			initialMessage.edit(answer)
		}else {
			initialMessage.edit("Something went wrong. The owner should check the console.")
		}
	}
};