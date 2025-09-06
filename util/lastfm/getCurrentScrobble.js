const getNickname = require("../getNickname");
const parseMention = require("../parseMention");
const getFmUsername = require("./getFmUsername");
const {EmbedBuilder} = require('discord.js');
const path = require('path');
const fs = require('fs');
const { writeFile } = require('node:fs/promises')
const executeCommand = require('../executeCommand');
const { Readable } = require('node:stream')

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
    const apiKey = process.env.LAST_FM_API_KEY;
    let lastfmUsername = await getFmUsername(userID);
    if (lastfmUsername != undefined) {
        let tracks = await new Promise((resolve, reject) => {
            fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastfmUsername}&api_key=${apiKey}&format=json`)
                .then(response => response.json())
                .then(data => {
                    let tracks = [];
                    let track;
                    try {
                        for (let i = 0; i < 2; i++) {
                            let scrobble = {};
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
                        let scrobble = {};
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
        if (tracks.error != null) {
            sendText.text = tracks.errorMsg;
            return sendText;
        }
        let coverDir = path.resolve(process.cwd(), 'data', 'covers');
        let color = "#C27D0E"
        const directory = path.resolve(coverDir, Math.floor(new Date).toString())
        fs.mkdirSync(directory, {recursive: true})
        const coverFile = path.resolve(directory, "cover")
        let downloadResult = await downloadImage(tracks[0].cover, coverFile);
        if(downloadResult.value === ERROR_CODES.SUCCESS){
            const commandArgs = [`${coverFile}.${downloadResult.ext}`, "-resize", "1x1", "txt:-"]         
            let res = executeCommand("magick", commandArgs);
            if(!res.error) color = res.output.split("\n")[1].split(" ")[3].slice(0,7);
            
        }
        const embed = new EmbedBuilder()
        .setAuthor({name: `Now playing - ${nickname}`, iconURL: user.user.avatarURL({ dynamic: true, size: 4096 })})
        .setThumbnail(tracks[0].cover)
        .setColor(color)
        .addFields({
            name: `${isCurrentScrobble}:`, value: `${tracks[0].song}\n **${tracks[0].artist} • ** ${tracks[0].album}`
        },)
        if (isCurrentScrobble === "Current") {
            embed.addFields({
                name: "Previous:", value: `${tracks[1].song}\n **${tracks[1].artist} • ** ${tracks[1].album}`
            },)
        }
        sendText.embed = embed;
        fs.rmSync(`${directory}`, {recursive: true})
    } else {
        sendText.text = "You haven't set your last.fm username yet. Use `<prefix>fm set <lastfm_username>` to set it.";
    }
    return sendText;
}
const ERROR_CODES = {
    SUCCESS: 0,
    HTTP_ERROR: 1,
    NOT_IMAGE: 2,
    FETCH_ERROR: 3
}
async function downloadImage(url, downloadPath) { 
    let res;
    try {
        res = await fetch(url);
    } catch (error) {
        return {value: ERROR_CODES.FETCH_ERROR, errorMessage: error.cause?.message || error.message};
    }
    if(!res.ok) return {value: ERROR_CODES.HTTP_ERROR, errorMessage: res.status.toString()};
    const contentType = res.headers.get('content-type');
    
    if(!contentType || !contentType.startsWith("image")) return {value: ERROR_CODES.NOT_IMAGE, errorMessage: contentType || "No content-type header"};
    const fileExt = contentType.split("/")[1]
    const stream = Readable.fromWeb(res.body)
    await writeFile(`${downloadPath}.${fileExt}`, stream);
    return {value: ERROR_CODES.SUCCESS, errorMessage: "", ext: fileExt};
}
