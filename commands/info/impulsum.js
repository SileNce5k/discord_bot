const impulsumStatus = require('../../util/impulsumStatus')
const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "impulsum",
    description: "Check how many people are online on impulsum servers",
    needsWhitelist: true,
    async execute({message}) {
       
        let res = await impulsumStatus();
        let sendText = "";
        if(typeof(res) === "string"){
            message.channel.send(res);
        }else {
            const embed = new EmbedBuilder();
            
            embed.setColor("#ee7939")
            embed.setTimestamp()
            let statusText = res.maintenance ? "Under maintenance" : "Online";
            embed.addFields(
                { name: "Status", value: statusText, inline: false },
                { name: "Player Count", value: res.onlineNow.toString(), inline: false },
                { name: "Max Players", value: res.maxOnline.toString(), inline: false },
            )
            if(res.maintenance) embed.addFields({
                name: "Maintenance message", value: res.maintenanceMsg, inline: false
            })
            
            message.channel.send({embeds: [embed]});

        }

    }

}