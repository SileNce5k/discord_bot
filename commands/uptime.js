const parseMS = require('parse-ms')

module.exports = {
    name: 'uptime',
    description: 'Returns uptime',
    execute({message, client}) {

        let days = "";
        let hours = "";
        let minutes = "";
        let seconds = "";
        let milliseconds = "";

        let uptime = parseMS(client.uptime)
        if (uptime.days != 0)
            days = `${uptime.days} days, `
        if (uptime.hours != 0)
            hours = `${uptime.hours} hours, `
        if (uptime.minutes != 0)
            minutes = `${uptime.minutes} minutes, `
        if (uptime.seconds != 0)
            seconds = `${uptime.seconds} seconds, and `
        if (uptime.milliseconds != 0)
            milliseconds = `${uptime.milliseconds} milliseconds`

        let fullUptime = `This bot has an uptime of ${days}${hours}${minutes}${seconds}${milliseconds}`

        message.channel.send(fullUptime)
    }
};