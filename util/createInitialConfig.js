module.exports = function (bot) {
	let fs = require('fs')
	let config = {
		"globalPrefix": "+",
		"token": "",
		"enableLoginMessage": false,
		"loginChannel" : "",
		"loginMessage" : "Bot is online!",
		"owners": [],
		"enableManagementAPI": false,
	}

	if(!fs.existsSync("./data/")) fs.mkdirSync("./data");

	fs.writeFileSync('./data/config.json', JSON.stringify(config, null, 4))

	bot.log("Enter the token as described in the README.md file");
	process.exit();
}