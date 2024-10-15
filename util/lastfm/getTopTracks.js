// http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=username&api_key=YOUR_API_KEY&format=json

const getFmUsername = require("./getFmUsername");
const Discord = require('discord.js');
const getNickname = require('../getNickname')
const parseMention = require('../parseMention')

module.exports = async function (userID, option, guild, compatibility=false) {
    let lastfmUsername = await getFmUsername(userID)
    let parse = parseMention(userID, guild)
    let user = guild.members.cache.get(parse);
    let nickname = getNickname(user, guild)
    if (nickname == null) {
        nickname = user.user.username;
    }
    let tracks = [];
    const options = {
        "weekly": "7day",
        "week": "7day",
        "w": "7day",

        "monthly": "1month",
        "month": "1month",
        "m": "1month",

        "quarterly": "3month",
        "q": "3month",

        "halfyear": "6month",
        "hy": "6month",
        "h": "6month",

        "yearly": "12month",
        "year": "12month",
        "y": "12month",

        "alltime": "overall",
        "a": "overall",
        "at": "overall",
        "all": "overall",

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
        .setAuthor(`Top ${duration} tracks for ${nickname}`, user.user.avatarURL({ dynamic: true, size: 4096 }))
        .setThumbnail(tracks[0].cover)
        .setColor(15780145)
        let tracksInfo = "";
        for(let i = 0; i < tracks.length; i++){
	        let pluralCharacter = tracks[i].playcount > 1 ? 's' : '';
            let track = `${i}. **${tracks[i].artist}** - ${tracks[i].song} - *${tracks[i].playcount} play${pluralCharacter}*`;
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
    if(compatibility)
        return tracks;
    else 
        return sendText;
    
}