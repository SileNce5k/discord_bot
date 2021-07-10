const fs = require('fs');
module.exports = function(customName, customMessage, author){
	let sendText;
	const customPath = './data/customCommands.json';

	let json = fs.readFileSync(customPath, 'utf8');
	let customCommands = JSON.parse(json)
	
	let isExists = false;
	customCommands.forEach(function (customCommand) {
		if (customCommand.customName === customName) {
			sendText = "This custom command already exists";
			isExists = true;
		}
	});
	if (!isExists) {
		let newCustomCommand = {
			"customName": customName, "customMessage": customMessage, "author": author 
		}
		customCommands.push(newCustomCommand)
		sendText = `New custom command with the name "${customName}" added`
	}
	fs.writeFileSync(customPath, JSON.stringify(customCommands, null, 4))
	return sendText;
}