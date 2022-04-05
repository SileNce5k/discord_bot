const fs = require('fs');
module.exports = function(customName){
	let author = false;
	const customPath = './data/customCommands.json';
	let json = fs.readFileSync(customPath, 'utf8');
	let customCommands = JSON.parse(json)
	customCommands.forEach(function (customCommand) {
		if (customCommand.customName === customName) {
			author = customCommand.author;
		}
	});

	return author;
	
}