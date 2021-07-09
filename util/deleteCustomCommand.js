const fs = require('fs')
module.exports = function(customName, author, owners){
	const customPath = './data/customCommands.json';
	let sendText = "This custom command does not exist.";
	let json = fs.readFileSync(customPath, 'utf8');
	let customCommands = JSON.parse(json)
	let index = 0;
	customCommands.forEach(function (customCommand) {
		if (customCommand.customName === customName) {
			if(customCommand.author === author || owners.indexOf(author.toString()) != -1 ){
				customCommands.splice(index, 1)
				sendText = `The custom command "${customName}" has been deleted.`
				fs.writeFileSync(customPath, JSON.stringify(customCommands, null, 4))
			}else {
				sendText = "You do not own this custom command.\nOnly the one who created the custom command can delete it."
			}
		}
		index++
	});


	return sendText;
}