const fs = require('fs')
module.exports = function(customName, newCustomName, author){
	const customPath = './data/customCommands.json';
	let sendText = "This custom command does not exist.";
	let json = fs.readFileSync(customPath, 'utf8');
	let customCommands = JSON.parse(json)
	let alreadyExists = false;
	let commandExists = false;
	customCommands.forEach(function (customCommand) {
		if(customCommand.customName === customName){
			commandExists = true;
		}
		if (customCommand.customName === newCustomName) {
			alreadyExists = true;
			sendText = "Can't rename this custom command. A custom command with that name already exists.";
		}
	});
	if (!alreadyExists && commandExists){
		customCommands.forEach(function (customCommand) {
			if (customCommand.customName === customName) {
				if(customCommand.author === author){
					customCommand.customName = newCustomName;
					fs.writeFileSync(customPath, JSON.stringify(customCommands, null, 4))
					sendText = `${customName} has been renamed to ${newCustomName}.`;
				}else {
					sendText = "You do not own this custom command.\nOnly the one who created the custom command can rename it."
				}
			}
		});
	}

	return sendText;
}