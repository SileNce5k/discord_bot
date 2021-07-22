const fs = require('fs')

module.exports = function (path) {
	let subdir = fs.readdirSync(path)
	let commandFiles = [];
	subdir.forEach(item => {
		if(fs.statSync(path+item).isDirectory()){
			let subdirFiles = fs.readdirSync(path+item)
			subdirFiles.forEach(file => {
				if(file.endsWith('.js')){
					commandFiles.push(path+item+"/"+file)

				}
			});

		}else if(item.endsWith('.js')){
			commandFiles.push(path+item)
		}
	});
	
	return commandFiles
}
