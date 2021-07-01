module.exports = {
	name: 'update',
	description: 'pull changes from master and reload commands',
	admin: true,
	execute({message}) { 
		let cmd = "git pull";
		const exec = require("child_process").exec;
	
		exec(cmd, (err, stdout, stderr) => {
			process.stdout.write(stdout);
			if (err) {
				message.channel.send("Something went wrong...");
				console.log(stderr);
			}
		});

	}
};