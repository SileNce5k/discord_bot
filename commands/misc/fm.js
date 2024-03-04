const fmlogin = require("../../util/lastfm/fmlogin");
const getCurrentScrobble = require("../../util/lastfm/getCurrentScrobble");

module.exports = {
    name: 'fm',
    description: 'Last fm commands. See `<prefix>help fm` for more info.',
    moreHelp: ["Set username: `<prefix>fm set <lastfm_username>`",],
    async execute({ message, args }) {
        let sendText = "Something went wrong.";
        switch (args[0]) {
            case "help":
                sendText = this.moreHelp;
                break;
            case "set":
                sendText = await fmlogin(message.author.id, args[1]);
                break;
            default:
                break;
        }
        if(args.length < 1){
            sendText = await getCurrentScrobble(message.author.id);
        }
        message.channel.send(sendText);
    }
};