const getGuildCount = require("./getGuildCount")
const parseMS = require('parse-ms');
module.exports = function ({presenceText, presenceType, client}) {
	const {globalPrefix} = require ('../data/config.json')
	let guildCount = getGuildCount(client)
	let uptime = parseMS(client.uptime);
	let uptimeSingularOrPlural = uptime.hours > 1 || uptime.minutes > 1 ? "s" : "";
	let uptimeFormat = uptime.hours >= 1 || uptime.days >= 1 ? uptime.days * 24 + uptime.hours + ` hour${uptimeSingularOrPlural}`: uptime.minutes + ` minute${uptimeSingularOrPlural}`;
	let regex = [/\${guilds}/g,/\${prefix}/g,/\${uptime}/g];
	let replaceValue = [guildCount, globalPrefix, uptimeFormat];
	for(let i = 0; i < regex.length; i++){
		presenceText = presenceText.replace(regex[i], replaceValue[i]);
	}
	client.user.setActivity(presenceText, { type: presenceType });
}