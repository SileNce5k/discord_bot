module.exports = function () {
	let fs = require('fs')
	let config = {
		"globalPrefix": "+",
		"token": "",
		"enableLoginMessage": false,
		"loginChannel" : "",
		"loginMessage" : "Bot is online!",
		"owners": [],
		"allowNetload" : false
	}
	fs.mkdirSync("./data");

	fs.writeFileSync('./data/config.json', JSON.stringify(config, null, 4))

	console.log("Enter the token as described in the README.md file");
	process.exit();
}