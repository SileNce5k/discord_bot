const fs = require('fs')
module.exports = function(customName, author, newCustomMessage){
	const customPath = './data/customCommands.json';
	let sendText = "This custom command does not exist.";
	let json = fs.readFileSync(customPath, 'utf8');
	let customCommands = JSON.parse(json)
	customCommands.forEach(function (customCommand) {
		if (customCommand.customName === customName) {
			if(customCommand.author === author){
				customCommand.customMessage = newCustomMessage;
				fs.writeFileSync(customPath, JSON.stringify(customCommands, null, 4))
				sendText = `${customName} has been updated.`;
			}else {
				sendText = "You do not own this custom command.\nOnly the one who created the custom command can edit it."
			}
		}
	});

	return sendText;
}