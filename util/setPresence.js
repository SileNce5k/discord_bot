const getGuildCount = require("./getGuildCount")
const parseMS = require('./parseMS');
const convertDateToISOString = require('./convertDateToISOString')
module.exports = function ({presenceText, presenceType, client}) {
	const {globalPrefix} = require ('../data/config.json')
	let guildCount = getGuildCount(client)
	let uptime = parseMS(client.uptime);
	let uptimeFormat = "";
	let uptimeSingularOrPlural;
	if(uptime.hours >= 1 || uptime.days >= 1){
		let hours = uptime.days * 24 + uptime.hours;
		uptimeSingularOrPlural = hours > 1 ? "s" : "";
		uptimeFormat = `${hours} hour${uptimeSingularOrPlural}`;
	}else if(uptime.minutes > 1){
		uptimeSingularOrPlural = uptime.minutes > 1 ? "s" : "";
		uptimeFormat = uptime.minutes + ` minute${uptimeSingularOrPlural}`;
	}else{
		uptimeFormat = `less than a minute`
	}

	let regex = [/\${guilds}/g,/\${prefix}/g,/\${uptime}/g];
	let replaceValue = [guildCount, globalPrefix, uptimeFormat];
	for(let i = 0; i < regex.length; i++){
		presenceText = presenceText.replace(regex[i], replaceValue[i]);
	}
	
	try {
		client.user.setPresence({ activities: [{ name: presenceText, type: presenceType }]});
	}catch(e){
		console.error(`${convertDateToISOString(new Date)}\n${e}`);
	}
}