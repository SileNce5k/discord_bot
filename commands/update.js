const calculateReloaded = require("../util/calculateReloaded");
const reloadCommands = require("../util/reloadCommands");

module.exports = {
	name: 'update',
	description: 'pull changes from remote and reload commands with git',
	admin: true,
	execute({message, client}) { 
		let cmd = "git pull --ff-only";
		const exec = require("child_process").exec;
		exec(cmd, (err, stdout, stderr) => {
			process.stdout.write(stdout);
			if(stdout.startsWith("Already up to date.")){
				message.channel.send("Already up to date.\nNo updating needed.")
			}else{
				let beforeSize = client.commands.size;
				reloadCommands(client)
				let sendText = `${stdout}\nBot updated, and\n${calculateReloaded(beforeSize, client)}`
				message.channel.send(sendText).then(function(msg){
					cmd = "git log --oneline -n 1";
					exec(cmd, (err, stdout, stderr) =>{
						process.stdout.write(stdout)
						msg.edit(`${sendText}\n\nNewest commit:\n${stdout.split(" ")[1]}`)
						if (err) console.log(stderr)
						
					})
					
				})
			}
			if (err) {
				message.channel.send("Something went wrong...");
				console.log(stderr);
			}
		});
		
	}
};