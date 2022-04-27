const getGuildCount = require("./getGuildCount")
const parseMS = require('parse-ms');
module.exports = function ({presenceText, presenceType, client}) {
	const {globalPrefix} = require ('../data/config.json')
	let guildCount = getGuildCount(client)
	let uptime = parseMS(client.uptime);
	let uptimeInMinutes = uptime.days * 24 * 60 + uptime.hours * 60 + uptime.minutes;
	let regex = [/\${guilds}/g,/\${prefix}/g,/\${uptime}/g];
	let replaceValue = [guildCount, globalPrefix, uptimeInMinutes];
	for(let i = 0; i < regex.length; i++){
		presenceText = presenceText.replace(regex[i], replaceValue[i]);
	}
	client.user.setActivity(presenceText, { type: presenceType });
}