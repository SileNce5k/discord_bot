const getGuildInfo = require("./getGuildInfo")
const parseMS = require('./parseMS');
const convertDateToISOString = require('./convertDateToISOString')
module.exports = function ({presenceText, presenceType, client}) {
	const globalPrefix = client.settings.get("globalPrefix")
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

	let presenceVariables = {
		guilds: guildInfo.guildCount,
		prefix: globalPrefix,
		uptime: uptimeFormat,
		members: guildInfo.totalMembers,
		uniqueMembers: guildInfo.uniqueMemberCount
	}

	const regex = /(?<=\${)(.*?)(?=})/g;
	const matches = presenceText.match(regex);

	if(matches){
		matches.forEach(match => {
			if(presenceVariables[match]){
				presenceText = presenceText.replace(`\${${match}}`, presenceVariables[match]);
			}
		});
	}
	
	try {
		const lastPresenceObject = client.settings.get("lastPresenceObject")
		if(lastPresenceObject.presenceType !== presenceType && lastPresenceObject.presenceText !== presenceText){
			client.user.setPresence({ activities: [{ name: presenceText, type: presenceType }]});
			client.settings.set(lastPresenceObject, {presenceType, presenceText})
		}
	}catch(e){
		console.error(`${convertDateToISOString(new Date)}\n${e}`);
	}
}