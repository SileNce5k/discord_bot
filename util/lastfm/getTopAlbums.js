// http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=username&api_key=YOUR_API_KEY&format=json

const getFmUsername = require("./getFmUsername");
const {EmbedBuilder} = require('discord.js');
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
    let albums = [];
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
    if(lastfmUsername != undefined){
        albums = await new Promise ((resolve, reject) => {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${lastfmUsername}&period=${option[0]}&api_key=${process.env.LAST_FM_API_KEY}&format=json`)
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < 10; i++){
                let album = {}
                let currentAlbum = data.topalbums.album[i];
                album.artist = currentAlbum.artist.name;
                album.name = currentAlbum.name;
                album.playcount = currentAlbum.playcount;
                albums.push(album);
            }
            resolve(albums);
        })
        .catch(error => {
            console.error(error);
            reject(error);
        });
    });
    }
    // const embed = new EmbedBuilder()
    //     .setAuthor({name: `Top ${duration} albums for ${nickname}`, iconURL: user.user.avatarURL({ dynamic: true, size: 4096 })})
    //     .setThumbnail(albums[0].cover)
    //     .setColor(15780145)
    //     let tracksInfo = "";
    //     for(let i = 0; i < albums.length; i++){
	//         let pluralCharacter = albums[i].playcount > 1 ? 's' : '';
    //         let track = `${i}. **${albums[i].artist}** - ${albums[i].song} - *${albums[i].playcount} play${pluralCharacter}*`;
    //         if(i < albums.length - 1){
    //             tracksInfo += `${track}\n`;
    //         }else{
    //             tracksInfo += `${track}`;
    //         }
    //     }
    //     embed.addFields({
    //         name: ` `, value: `${tracksInfo}`
    //     },)
    // sendText.embed = embed;
    // if(compatibility)
        return albums;
    // else 
    //     return sendText;
    
}