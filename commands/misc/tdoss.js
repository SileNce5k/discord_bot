const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { writeFile } = require('node:fs/promises')
const { Readable } = require('node:stream')


module.exports = {
    name: 'tdoss',
    description: 'Combine picture with tdoss album cover template',
    async execute({ message, args }) {

        let dataDir = path.resolve(__dirname, '..', '..', 'data');
        const directory = path.resolve(dataDir, Math.floor(new Date).toString())
        fs.mkdirSync(directory)
        
        let url = "";
        if(message.attachments.size > 0){
            url = message.attachments.first().url


        } else if(args[0] && args[0].startsWith("https://") ){
                url = args[0];
        }else if(message.reference){
            let referencedMessage = await message.fetchReference();
            if(referencedMessage.attachments.size > 0){
                url = await referencedMessage.attachments.first().url;
            }
            else {
                message.channel.send("The message you replied to doesn't have any attachments.");
                return;
            }
        }
        else {
            message.channel.send("You have to provide an image to use this command.\nEither through an attachment, a link, or you can reply to a message with an image attachment.")
            fs.rmSync(`${directory}`, {recursive: true})
            return
        }
        // TODO: Download with correct extension. 
        message.channel.sendTyping();
        if(await this.downloadImage(url, path.resolve(directory, "input.png")) != 0){
            message.channel.send("Something went wrong during the download.\nThe link might be unreachable for the bot or it's not an image.")
            fs.rmSync(`${directory}`, {recursive: true})
            return;
        }


        const command = `magick ${dataDir}/tdoss_template.png \\( ${directory}/input.png -resize 800x800^ -gravity center -extent 1000x1000 \\) -compose dst-over -composite ${directory}/tdoss_result.png`;
        if (this.executeCommand(command).error === true) {
            message.channel.send("Something went wrong during image manipulation.\nTry again and if it keeps happening, contact the owner of the bot.")
            fs.rmSync(`${directory}`, {recursive: true})
            return
        }

        let final_image = {
                attachment: path.resolve(`${directory}/tdoss_result.png`),
                name: "tdoss_result.png"
        }

        await message.channel.send({files: [final_image]})
        fs.rmSync(`${directory}`, {recursive: true})
    },


    executeCommand(command) {
        console.log("Executing:", command)
        try {
            const output = execSync(command, { encoding: 'utf-8' })
            if (output.length != 0)
                console.log(output)
        } catch (error) {
            console.error(`Error executing ${command.split(" ")[0]} command:`, error);
            return { error: true };
        }
        return { error: false };
    },
    // https://stackoverflow.com/a/77210219
    async downloadImage(url, path) { 
        const res = await fetch(url);
        if(!res.ok) return 1;
        if(!res.headers.get('content-type').startsWith("image")) 2;
        const stream = Readable.fromWeb(res.body)
        await writeFile(path, stream);
        return 0;
    }

}


