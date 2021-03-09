module.exports = {
	name: 'e',
	description: 'Returns emoji url',
	execute({message, args}) {
        let emoji = args.join(` `);

        if (!emoji) {
          message.channel.send("no emoji");
          return;
        }
        if (args[0].charAt(1) == "a") {
          var extension = ".gif";
        } else
            var extension = ".png"
    
        var num = emoji.split(":")[2];
        try {
          num = num.slice(0, -1);
        } catch (e) {
          message.channel.send("There was an error.");
          return;
        }
        message.channel.send("https://cdn.discordapp.com/emojis/" + num + extension);
	}
};