const getNickname = require("../getNickname");
const parseMention = require("../parseMention");
const getFmUsername = require("./getFmUsername");
const Discord = require('discord.js');

require("dotenv").config();
module.exports = async function (userID, guild) {
    let parse = parseMention(userID, guild)
    let user = guild.members.cache.get(parse);
    let nickname = getNickname(user, guild)
    if (nickname == null) {
        nickname = user.user.username;
    }
    let isCurrentScrobble = "Current";
    let sendText = { text: "", embed: null }
    let scrobble = {};
    const apiKey = process.env.LAST_FM_API_KEY;
    let lastfmUsername = await getFmUsername(userID);
    if (lastfmUsername != undefined) {
        scrobble = await new Promise((resolve, reject) => {
            fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastfmUsername}&api_key=${apiKey}&format=json`)
                .then(response => response.json())
                .then(data => {
                    let scrobble = {};
                    let tracks = [];
                    let track;
                    try {
                        for (let i = 0; i < 2; i++) {
                            track = data.recenttracks.track[i];
                            scrobble.artist = track.artist["#text"];
                            scrobble.song = track.name;
                            scrobble.album = track.album["#text"];
                            scrobble.cover = track.image[3]["#text"];
                            if (i === 0) {
                                if (!track["@attr"]) {
                                    isCurrentScrobble = "Last";
                                }
                            }
                            tracks.push(scrobble);
                        }
                        resolve(tracks);
                    } catch (error) {
                        scrobble.error = true;
                        if (data.error === 6) {
                            scrobble.errorMsg = "User not found. Use `<prefix>fm set <lastfm_username>` to set your last.fm username.";
                            resolve(scrobble);
                        }
                        scrobble.errorMsg = "Last.fm is probably having problems. Try again later.";
                        resolve(scrobble);
                    }
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
        if (scrobble.error != null) {
            sendText.text = scrobble.errorMsg;
            return sendText;
        }
        const embed = new Discord.MessageEmbed()
            .setAuthor(`Now playing - ${nickname}`, user.user.avatarURL({ dynamic: true, size: 4096 }))
            .setThumbnail(scrobble[0].cover)
            .setColor(15780145)
            .addFields({
                name: `${isCurrentScrobble}:`, value: `${scrobble[0].song}\n **${scrobble[0].artist} • ** ${scrobble[0].album}`
            },)
        if (isCurrentScrobble === "Current") {
            embed.addFields({
                name: "Previous:", value: `${scrobble[1].song}\n **${scrobble[1].artist} • ** ${scrobble[1].album}`
            },)
        }
        sendText.embed = embed;
    } else {
        sendText.text = "You haven't set your last.fm username yet. Use `<prefix>fm set <lastfm_username>` to set it.";
    }
    return sendText;
}