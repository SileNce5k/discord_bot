const fmlogin = require("../../util/lastfm/fmlogin");
const getCurrentScrobble = require("../../util/lastfm/getCurrentScrobble");
const getTopTracks = require("../../util/lastfm/getTopTracks");
module.exports = {
    name: 'fm',
    description: 'Last fm commands. See `<prefix>help fm` for more info.',
    moreHelp: ["Set username: `<prefix>fm set <lastfm_username>`",],
    async execute({ message, args }) {
        let sendText = "Something went wrong.";
        switch (args[0]) {
            case "help":
                sendText = this.moreHelp.join("\n");
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