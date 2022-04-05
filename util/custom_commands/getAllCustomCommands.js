const fs = require('fs');
module.exports = function(){
	const customPath = './data/customCommands.json';
	let list = "";

	let json = fs.readFileSync(customPath, 'utf8');
	let customCommands = JSON.parse(json)
	customCommands.forEach(function (customCommand) {
		list = list + customCommand.customName+"\n";
	});

	return list;
}