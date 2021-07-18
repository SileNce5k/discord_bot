const fs = require('fs')
const commandPath = 'commands/'
const utilPath = 'util/'


module.exports = function (client) {
	let utilFiles = fs.readdirSync(utilPath).filter(file => file.endsWith('.js'));
	let temp = fs.readdirSync(commandPath)//.filter(file => file.endsWith('.js'));
	console.log("Temp 1 = \n"+temp + "\nEnd of Temp 1")
	let commandFiles = [];
	temp.forEach(item => {
		
		if(fs.statSync(commandPath+item).isDirectory()){
			
			let temp2 = fs.readdirSync(commandPath+item).filter(file => file.endsWith('.js'))
			
			temp2.forEach(file => {
				console.log(commandPath+item+"/"+file)
				commandFiles.push(commandPath+item+"/"+file)
				
			});
			// console.log("Start of TEMP 2:\n"+commandPath+"/"+item+"/"+temp2+"\nEnd of temp 2\n")
			// for (const i in temp2) {

			// 	commandFiles.push(commandPath+item+temp2)
			
			// }
		}
	});
	console.log(commandFiles)
	if (client.commands.size != 0) {
		for (const i of commandFiles) {
			delete require.cache[require.resolve(`../${commandPath}${i}`)];
		}
		for (const i of utilFiles){
			delete require.cache[require.resolve(`../${utilPath}${i}`)]
		}
	}
	client.commands.clear()
	for (const file of commandFiles) {
		const command = require(`../${file}`);
		client.commands.set(command.name, command);
	}
	console.log(client.commands)
}

