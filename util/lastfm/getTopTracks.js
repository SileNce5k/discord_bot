// http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=username&api_key=YOUR_API_KEY&format=json
const Discord = require('discord.js');
const getFmUsername = require("./getFmUsername")

module.exports = async function (userID, option) {
    let lastfmUsername = await getFmUsername(userID);
    let sendText = {text: "", embed: null};
    let tracks = [];
    const options = {
        "alltime": "overall",
        "weekly": "7day",
        "monthly": "1month",
        "quarterly": "3month",
        "halfyear": "6month",
        "yearly": "12month",
        undefined: "7day"
    }
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
    let author = `Top ${duration} tracks for ${lastfmUsername}:\n`;
    let toptracks = "";
    for(let i = 0; i < tracks.length; i++){
        sendText += `${i}. ${tracks[i].artist} - ${tracks[i].song} (${tracks[i].playcount} plays)\n`;
    }
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Now playing - ${nickname}`, user.user.avatarURL({ dynamic: true, size: 4096 }))
    .setColor(15780145)
    
    } else {
        sendText.text = "You haven't set your last.fm username yet. Use `fm set <lastfm_username>` to set it.";
    }
    return sendText;
}