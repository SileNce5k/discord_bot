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
		exec(cmd, (err, stdout, stderr) => {
			if(err){
				fs.writeFileSync("../../data/log.txt", `${convertDateToISOString(new Date())}\n${stderr}\n`, {flag: 'a'});
				message.channel.send(`Something went wrong, check data/log.txt for more information`);
				return;
			}
			reloadCommands(client);
			message.channel.send(`${stdout}\nCommands reloaded`);
		});
	}
};