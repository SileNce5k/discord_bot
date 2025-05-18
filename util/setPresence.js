const getGuildInfo = require("./getGuildInfo")
const parseMS = require('./parseMS');
const convertDateToISOString = require('./convertDateToISOString')
module.exports = function ({presenceText, presenceType, client}) {
	const {globalPrefix} = require ('../data/config.json')
	const guildInfo = getGuildInfo(client);
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

	let regex = [/\${guilds}/g,/\${prefix}/g,/\${uptime}/g, /\${members}/g];
	let replaceValue = [guildInfo.guildCount, globalPrefix, uptimeFormat, guildInfo.totalMembers];
	for(let i = 0; i < regex.length; i++){
		presenceText = presenceText.replace(regex[i], replaceValue[i]);
	}
	
	try {
		client.user.setPresence({ activities: [{ name: presenceText, type: presenceType }]});
	}catch(e){
		console.error(`${convertDateToISOString(new Date)}\n${e}`);
	}
}