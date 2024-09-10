// http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=username&api_key=YOUR_API_KEY&format=json

const getFmUsername = require("./getFmUsername");
const Discord = require('discord.js');
const getNickname = require('../getNickname')
const parseMention = require('../parseMention')

module.exports = async function (userID, option, guild) {
    let lastfmUsername = await getFmUsername(userID)
    let parse = parseMention(userID, guild)
    let user = guild.members.cache.get(parse);
    let nickname = getNickname(user, guild)
    if (nickname == null) {
        nickname = user.user.username;
    }
    let tracks = [];
    const options = {
        "d": "1day",
        "m": "1month",
        "w": "7day",
        "q": "3month",
        "h": "6month",
        "y": "12month",
        "all": "overall",
        "daily": "1day",
        "weekly": "7day",
        "monthly": "1month",
        "quarterly": "3month",
        "halfyear": "6month",
        "yearly": "12month",
        "biweekly": "14day",
        "fortnight": "14day",
        "twomonth": "2month",
        "twoyear": "24month",
        "weekend": "2day",
        undefined: "7day"
    };
    
    if(option.length === 0){
        option[0] = "weekly"
    }
    
    option[0] = options[option[0]];
    if(option[0] === undefined)
        option[0] = options[option[0]];
    
    let duration = "";
    switch (option[0]){
        case "overall":
            duration = "all time";
            break;
        case "7day":
            duration = "weekly";
            break;
        case "1month":
            duration = "monthly";
            break;
        case "3month":
            duration = "quarterly";
            break;
        case "6month":
            duration = "half year";
            break;
        case "12month":
            duration = "yearly";
            break;
    }
    let sendText = { text: "", embed: null }
    const apiKey = process.env.LAST_FM_API_KEY;
    if(lastfmUsername != undefined){
        tracks = await new Promise ((resolve, reject) => {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${lastfmUsername}&period=${option[0]}&api_key=${apiKey}&format=json`)
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < 10; i++){
                let track = {}
                let currentTrack = data.toptracks.track[i];
                track.artist = currentTrack.artist.name;
                track.song = currentTrack.name;
                track.playcount = currentTrack.playcount;
                tracks.push(track);
            }
            resolve(tracks);
        })
        .catch(error => {
            console.error(error);
            reject(error);
        });
    });
    }
    const embed = new Discord.MessageEmbed()
        .setAuthor(`Top ${duration} for ${nickname}`, user.user.avatarURL({ dynamic: true, size: 4096 }))
        .setThumbnail(tracks[0].cover)
        .setColor(15780145)
        let tracksInfo = "";
        for(let i = 0; i < tracks.length; i++){
            let track = `${i}. **${tracks[i].artist}** - ${tracks[i].song} - *${tracks[i].playcount} plays*`
            if(i < tracks.length - 1){
                tracksInfo += `${track}\n`;
            }else{
                tracksInfo += `${track}`;
            }
        }
        embed.addFields({
            name: ` `, value: `${tracksInfo}`
        },)
    sendText.embed = embed;
    return sendText;
}