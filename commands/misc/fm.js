const fmlogin = require("../../util/lastfm/fmlogin");
const getCurrentScrobble = require("../../util/lastfm/getCurrentScrobble");
const getCurrentCover = require("../../util/lastfm/getCurrentCover");
const getTopTracks = require("../../util/lastfm/getTopTracks");
const help = require("../info/help");
const parseMention = require("../../util/parseMention");
const roast = require("../../util/lastfm/roast");
const getTopArtists = require("../../util/lastfm/getTopArtists");
const getTopAlbums = require("../../util/lastfm/getTopAlbums");
const {EmbedBuilder} = require('discord.js');
const getNickname = require('../../util/getNickname');
module.exports = {
    name: 'fm',
    description: 'Last fm commands. See `<prefix>help fm` for more info.',
    moreHelp: ["Info: Having a space between fm and the subcommand makes no difference.",
               "They behave the same (for example: `<prefix>fmtt` and `<prefix>fm tt`)",
               "Set username: `<prefix>fmset <lastfm_username>`",
               "Get current scrobble: `<prefix>fm`",
               "Get top tracks: `<prefix>fmtt`",
               "Get album cover for current scrobble: `<prefix>fmcover`",
               "Get a roast from an LLM using your top artists and albums: `<prefix>fmroast`"
              ],
    async execute({ message, args, prefix, client }) {
        let sendText = {text: "Something went wrong.", embed: null};
        switch (args[0]) {
            case "help":
                help.execute({ message: message, args: ["fm"], prefix: prefix, client: client });
                return;
            case "set":
                sendText.text = await fmlogin(message.author.id, args[1]);
                break;
            case "toptracks":
            case "tt":
                args.shift();
                sendText = await getTopTracks(message.author.id, args, message.guild);
                break;
            case "cover":
                sendText = await getCurrentCover(message.author.id, message.guild);
                break;
            case "roast":
                let topArtists = await getTopArtists(message.author.id, ["yearly"], message.guild, true);
                let topAlbums = await getTopAlbums(message.author.id, ["yearly"], message.guild, true);
                let result = await roast(topArtists, topAlbums);

                let parse = parseMention(message.author.id, message.guild)
                let user = message.guild.members.cache.get(parse);
                let nickname = getNickname(user, message.guild)
                if (nickname == null) {
                    nickname = user.user.username;
                }
                const possesive = nickname.at(nickname.length - 1) === "s" ? "'" : "'s"
                const embed = new EmbedBuilder()
                    .setAuthor({name: `${nickname}${possesive} AI roast`, iconURL: user.user.avatarURL({ dynamic: true, size: 4096 })})
                    .setColor(15780145)
                    .setDescription(result);
                sendText.embed = embed;
                break;
            default:
                sendText.text = `${args[0]} is not a valid subcommand.\nSee \`${prefix}help fm\` for more info.`;
                break;
        }
        if(args.length < 1){
            sendText = await getCurrentScrobble(message.author.id, message.guild);
        }
        if(sendText.embed != null){
            let parse = parseMention(message.author.id, message.guild)
            let user = message.guild.members.cache.get(parse);
            let roleColor = 15788778;
            if (user.roles.color) {
                roleColor = user.roles.color.color;
            }
            sendText.embed.setColor(roleColor);
		    message.channel.send({embeds :[sendText.embed]})
        }else{
            message.channel.send(sendText.text.replaceAll("<prefix>", prefix));
        }
    }
}; 