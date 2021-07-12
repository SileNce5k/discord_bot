module.exports = {
    name: 'e',
    description: 'Returns emoji url',
    moreHelp: ["Works with both animated and static emojis"],
    execute({ message, args }) {
        let emoji = args.join(` `);

        if (!emoji) {
            message.channel.send("no emoji");
            return;
        }
        let extension = ".png"
        if (args[0].charAt(1) == "a") {
            extension = ".gif";
        }
            

        let num = emoji.split(":")[2];
        try {
            num = num.slice(0, -1);
        } catch (e) {
            message.channel.send("There was an error.");
            return;
        }
        message.channel.send("https://cdn.discordapp.com/emojis/" + num + extension);
    }
};