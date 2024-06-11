const getNickname = require("../getNickname");
const parseMention = require("../parseMention");
const getFmUsername = require("./getFmUsername");
const Discord = require('discord.js');

require("dotenv").config();
module.exports = async function(userID, guild) {
    let parse = parseMention(userID, guild)
    let user = guild.members.cache.get(parse);
    let nickname = getNickname(user, guild)
    if(nickname == null){
        nickname = user.user.username;
    }
    let isCurrentScrobble = "Current";
    let sendText = {text: "", embed: null}
    let scrobble = {};
    const apiKey = process.env.LAST_FM_API_KEY;
    let lastfmUsername = await getFmUsername(userID);
    if(lastfmUsername != undefined){
        scrobble = await new Promise ((resolve, reject) => {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastfmUsername}&api_key=${apiKey}&format=json`)
        .then(response => response.json())
        .then(data => {
            let scrobble = {};
            let track = data.recenttracks.track[0];
            scrobble.artist = track.artist["#text"];
            scrobble.song = track.name;
            scrobble.album = track.album["#text"];
            scrobble.cover = track.image[3]["#text"];
            console.log(typeof track['@attr'].nowplaying);
            if(track['@attr'].nowplaying === "true"){
                isCurrentScrobble = "Last";
            }
            resolve(scrobble);
        })
        .catch(error => {
            console.error(error);
            reject(error);
        });
    });
    const embed = new Discord.MessageEmbed()
	.setAuthor(`Now playing - ${nickname}`, user.user.avatarURL({ dynamic: true, size: 4096 }))
    .setThumbnail(scrobble.cover)
    .setColor(15780145)
    .addFields({ 
        name: "Current:", value: `${scrobble.song}\n **${scrobble.artist} • ** ${scrobble.album}`
    },
    {
        name: "Previous:", value: `**TODO: Make this show the previous scrobble**`
    },)
    sendText.embed = embed;
    } else {
        sendText.text = "You haven't set your last.fm username yet. Use `fm set <lastfm_username>` to set it.";
    }
    return sendText;
}