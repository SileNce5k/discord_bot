
module.exports = {
    name: 'x',
    description: 'Replaces X/Twitter links with fxtwitter and deletes the original message',
    execute({message, args}) {
        if(args.length < 0) {
            message.channel.send("TODO: NO_X_LINK_ERR");
            return;
        }
        let replacedLink = "";
        const regex = /(x|twitter)\.com/g
        if(args[0].startsWith("https://") || args[0].startsWith("http://")){
            replacedLink = args[0].replace(regex, "fxtwitter.com");
        }
        if(replacedLink.length === 0){
            message.channel.send("You need to provide an X or twitter link to use this command.");
            return;
        }
        message.channel.send(replacedLink);
        try{
            message.delete()
        }catch(err){
            console.error(`${this.name}: An error happened while trying to delete the original message.`)
            console.error(err);
        }
    }
};