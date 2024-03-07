const fmlogin = require("../../util/lastfm/fmlogin");
const getCurrentScrobble = require("../../util/lastfm/getCurrentScrobble");
const getTopTracks = require("../../util/lastfm/getTopTracks");
module.exports = {
    name: 'fm',
    description: 'Last fm commands. See `<prefix>help fm` for more info.',
    moreHelp: ["Info: Having a space between fm and the subcommand makes no difference.",
               "They behave the same (for example: `<prefix>fmtt` and `<prefix>fm tt`)",
               "Set username: `<prefix>fmset <lastfm_username>`",
               "Get current scrobble: `<prefix>fm`",
               "Get top tracks: `<prefix>fmtt`"
              ],
    async execute({ message, args, prefix }) {
        let sendText = "Something went wrong.";
        switch (args[0]) {
            case "help":
                sendText = this.moreHelp.join("\n").replace("<prefix>", prefix);
                break;
            case "set":
                sendText = await fmlogin(message.author.id, args[1]);
                break;
            case "toptracks":
            case "tt":
                sendText = await getTopTracks(message.author.id, args);
            default:
                break;
        }
        if(args.length < 1){
            sendText = await getCurrentScrobble(message.author.id);
        }
        message.channel.send(sendText);
    }
};