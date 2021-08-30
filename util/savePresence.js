const fs = require('fs');
module.exports = function (presenceType, presenceText, client){ 
	const configPath = "./data/config.json";
	let config = JSON.parse(fs.readFileSync(configPath));
	
	config.presenceType = presenceType;
	config.presenceText = presenceText;
	client.settings.set("presenceType", presenceType);
	client.settings.set("presenceText", presenceText);

	fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
	
	
}