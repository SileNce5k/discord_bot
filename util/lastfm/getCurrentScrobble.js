const getFmUsername = require("./getFmUsername");

require("dotenv").config();
module.exports = async function(userID) {
    let sendText = "";
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
            resolve(scrobble);
        })
        .catch(error => {
            console.error(error);
            reject(error);
        });
    });
    sendText = `Currently scrobbling:\n${scrobble.artist} - ${scrobble.song}\nAlbum: ${scrobble.album}`;
    } else {
        sendText = "You haven't set your last.fm username yet. Use `fm set <lastfm_username>` to set it.";
    }
    return sendText;
}