const fs = require('fs');
module.exports = function (presenceType, presenceText){ 
	const configPath = "./data/config.json";
	let config = JSON.parse(fs.readFileSync(configPath));
	
	config.presenceType = presenceType;
	config.presenceText = presenceText;

	console.log(config);

	fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
	
	
}