// Code is taken from https://github.com/stphnduvall/mcstatus/blob/master/src/index.ts
// and converted to pure js.
    
const net = require('net')
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'mc',
    description: 'get minecraft server information',
    hidden: true,
    needsWhitelist: true,
    async execute({ message, args }) {
        let host = "";
        let port = 25565;
        if (args[0]) host = args[0];

        if (host.includes(":")) {
            port = host.replace(/.+(?:\:)/g, "");
            host = host.match(/.+(?:\:)/g, "")[0].replace(":", "");
        }
        if(host === "") return message.channel.send("No host provided")
        let info = await getMinecraftServerInfo(host, port);
        if (info) {
            const embed = new EmbedBuilder()
            embed.setColor("#ee7939")
            embed.setTimestamp()
            embed.addFields(
                { name: "ping", value: info.ping.toString(), inline: false },
                { name: "Player Count", value: info.playercount.toString(), inline: false },
                { name: "Max Players", value: info.maxPlayers.toString(), inline: false },
                { name: "MOTD", value: info.motd, inline: false },
            )

            message.channel.send({ embeds: [embed] });
        } else {
            message.channel.send("Something went wrong\nThe minecraft server is likely not reachable from the discord bot")
        }

    }
};



async function getMinecraftServerInfo(host, port = 25565) {
    let serverInfo = {
        ping: undefined,
        maxPlayers: undefined,
        version: undefined,
        playercount: undefined,
        motd: undefined
    }

    let startTime = new Date();
    let data;
    let ping;
    serverInfo = await new Promise((resolve) => {
        const client = net.connect({ host, port }, () => {
            ping = Math.round(new Date().getMilliseconds() - startTime.getMilliseconds());

            let buff = Buffer.from([0xFE, 0x01]);
            client.write(buff);

        })
        let error = false;
        client.on('data', (d) => {
            data = d.toString()
            client.destroy();

        })
        client.once('error', (error) => {
            console.error(error)
            error = true;
        })
        client.once('connectionAttemptFailed', (ip) => {
            console.error("in attempt failed")
            error = true;
        })

        client.once('connectionAttemptTimeout', (ip) => {
            console.error("in attempt timeout")
            error = true;
        })
        client.on('close', () => {
            if (!error) {
                let _serverInfo = data?.split('\x00\x00\x00');

                if (!_serverInfo) {
                    console.log("Something went wrong.")
                    resolve(serverInfo)
                }
                serverInfo.version = _serverInfo[2].replace(/\u0000/g, '')
                serverInfo.motd = _serverInfo[3].replace(/\u0000/g, '')
                serverInfo.playercount = Number(_serverInfo[4].replace(/\u0000/g, ''))
                serverInfo.maxPlayers = Number(_serverInfo[5].replace(/\u0000/g, ''))
                serverInfo.ping = Number(ping)
                resolve(serverInfo)
            } else {
                resolve(0)
            }
        })
    })
    return serverInfo
}
