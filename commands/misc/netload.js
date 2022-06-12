const https = require('https');
const fs = require('fs')
const netloadDir = "../../netload"
const validUrl = require('valid-url');

module.exports = {
	name: 'netload',
	description: 'Load a module from the internet',
	moreHelp: ["Examples:",
			   "Either provide a link to the module, or upload it",
			   "To get an example of how your module should look like, do:",
			   "<prefix>netload example",
			   "You have to be whitelisted to use this command.",
			   "The bot operator also has to have this enabled in the config."
			],
	execute({ message, args, prefix, client, owners }) {
		let json = fs.readFileSync('./data/netmoduleWhitelist.json', 'utf8');
		let whitelist = JSON.parse(json)
		if (json.indexOf(message.author.id.toString()) == -1) {
			message.channel.send("You do not have permissions to use this command.");
			return;
		}
		if (args[0] == "whitelist" && owners.indexOf(message.author.id.toString()) >= 0) {
			whitelist.push(args[1])
			fs.writeFileSync("./data/netmoduleWhitelist.json", JSON.stringify(whitelist, null, 4))
			return;
		}
		if (!args[0] && message.attachments.size == 0) {
			message.channel.send(`You have to either specify a url or upload a file via the command.\nTo get an example file, execute \`${prefix}netload example\``)
			return;

		} if (args[0] == "example") {

			let example = fs.readFileSync('commands/.example')

			message.channel.send(`\`\`\`js\n${example}\n\`\`\``)
			return;
		}


		let url, fileName;
		if (message.attachments.size > 0) {
			url = message.attachments.first().url
			fileName = message.attachments.first().name
		} else {
			url = args[0]
			if (!validUrl.isUri(url)) {
				message.channel.send("This does not look like a valid url")
				return;
			}
			fileName = args[0].split("/")[args[0].split("/").length - 1]
		}
		if (fs.existsSync(`${netloadDir}/${fileName}`)) {
			message.channel.send(`A module with this filename(${fileName}) already exists.`)
			return;
		}
		https.get(url, (res) => {
			res.on('data', (d) => {
				fs.writeFileSync(`${netloadDir}/${fileName}`, d);
				reloadNetModules(client);
			});

		}).on('error', (e) => {
			message.channel.send("Error download file.");
			console.log(e)
		});

		let reloadNetModules = require('../util/reloadNetModules');
		reloadNetModules(client)


	}
};

