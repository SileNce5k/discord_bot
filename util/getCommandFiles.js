const fs = require('fs')

module.exports = function (commandPath) {
	let subdir = fs.readdirSync(commandPath)
	let commandFiles = [];
	subdir.forEach(item => {
		if(fs.statSync(commandPath+item).isDirectory()){
			let subdirFiles = fs.readdirSync(commandPath+item).filter(file => file.endsWith('.js'))
			subdirFiles.forEach(file => {
				commandFiles.push(commandPath+item+"/"+file)
			});
		}
	});
	
	return commandFiles
}