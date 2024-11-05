const getNickname = require("../getNickname");
const parseMention = require("../parseMention");
const getFmUsername = require("./getFmUsername");
const {EmbedBuilder} = require('discord.js');

require("dotenv").config();
module.exports = async function(userID, guild) {
    let parse = parseMention(userID, guild)
    let user = guild.members.cache.get(parse);
    let nickname = getNickname(user, guild)
    if(nickname == null){
        nickname = user.user.username;
    }
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
            let track;
            try {
                track = data.recenttracks.track[0];
            } catch (error) {
                console.error(error);
                scrobble.error = true;
                switch(data.error){
                    case 6:
                        scrobble.errorMsg = "User not found. Use `<prefix>fm set <lastfm_username>` to set your last.fm username.";
                        break;
                    default:
                        scrobble.errorMsg = "Last.fm is probably having problems. Try again later.";
                        break;
                }
                resolve(scrobble);
            }
            scrobble.cover = track.image[3]["#text"];
            scrobble.artist = track.artist["#text"];
            scrobble.album = track.album["#text"];
            resolve(scrobble);
        })
        .catch(error => {
            console.error(error);
            reject(error);
        });
    });
    if(scrobble.error != null){
        sendText.text = scrobble.errorMsg;
        return sendText;
    }
    const embed = new EmbedBuilder()
	.setTitle(`${scrobble.artist} - **${scrobble.album}**`)
    .setImage(scrobble.cover)
    sendText.embed = embed;
    } else {
        sendText.text = "You haven't set your last.fm username yet. Use `<prefix>fm set <lastfm_username>` to set it.";
    }
    return sendText;
}