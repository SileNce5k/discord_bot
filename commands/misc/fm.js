const fmlogin = require("../../util/lastfm/fmlogin");
const getCurrentScrobble = require("../../util/lastfm/getCurrentScrobble");
const getTopTracks = require("../../util/lastfm/getTopTracks");
const help = require("../info/help");
module.exports = {
    name: 'fm',
    description: 'Last fm commands. See `<prefix>help fm` for more info.',
    moreHelp: ["Info: Having a space between fm and the subcommand makes no difference.",
               "They behave the same (for example: `<prefix>fmtt` and `<prefix>fm tt`)",
               "Set username: `<prefix>fmset <lastfm_username>`",
               "Get current scrobble: `<prefix>fm`",
               "Get top tracks: `<prefix>fmtt`"
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
                sendText.text = await getTopTracks(message.author.id, args);
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
            message.channel.send(sendText.text);
        }
    }
};