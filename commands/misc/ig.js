
module.exports = {
    name: 'ig',
    description: 'Replaces Instagram links with kkinstagram and deletes the original message',
    execute({message, args}) {
        const noUrlErr = "You need to provide an Instagram link to use this command."
        if(args.length < 1) {
            message.channel.send(noUrlErr);
            return;
        }
        let replacedLink = "";
        const regex = /(?<=\/)(instagram)\.com/g
        if(args[0].startsWith("https://") || args[0].startsWith("http://")){
            replacedLink = args[0].replace(regex, "kkinstagram.com");
        }
        if(replacedLink.length === 0 || args[0] === replacedLink){
            message.channel.send(noUrlErr);
            return;
        }
        message.channel.send(replacedLink);
        try{
            message.delete()
        }catch(err){
            console.error(`${this.name}: An error occurred while trying to delete the original message.`)
            console.error(err);
        }
    }
};