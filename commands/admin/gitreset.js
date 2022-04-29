const fs = require('fs');
const reloadCommands = require("../../util/reloadCommands");
const convertDateToISOString = require("../../util/convertDateToISOString");

module.exports = {
	name: 'gitreset',
	description: 'Reset head to master, and reload commands',
	admin: true,
	execute({message, client}) {
		let cmd = "git reset --hard master";
		const exec = require("child_process").exec; 
		let sendText = "";
		exec(cmd, (err, stdout, stderr) => {
			reloadCommands(client);
			sendText = `${stdout}\nCommands reloaded`;
			if(err){
				fs.writeFileSync("../../data/log.txt", `${convertDateToISOString(new Date())}\n${stderr}\n`, {flag: 'a'});
				sendText = `Something went wrong, check data/log.txt for more information`;
			}

		});
		message.channel.send(sendText);
	}
};