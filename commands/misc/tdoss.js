const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { writeFile } = require('node:fs/promises')
const { Readable } = require('node:stream')
const executeCommand = require('../../util/executeCommand');

module.exports = {
    name: 'tdoss',
    description: 'Combine picture with tdoss album cover template',
    async execute({ message, args }) {

        let tdossDir = path.resolve(process.cwd(), 'data', 'tdoss');
        const tdossTemplate = path.resolve(process.cwd(), 'resources', 'tdoss_template.png');

        const directory = path.resolve(tdossDir, Math.floor(new Date).toString())
        fs.mkdirSync(directory, {recursive: true})
        
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
            let lastMessages = await message.channel.messages.fetch({limit: 20, cache: false});
            let lastMessageWithAttachment = lastMessages.find(m => m.attachments.size > 0);
            if(!lastMessageWithAttachment){
                message.channel.send("Couldn't find an image to use this command on.")
                fs.rmSync(`${directory}`, {recursive: true})
                return
            }
            url = lastMessageWithAttachment.attachments.first().url;
            
        }
        // TODO: Download with correct extension. 
        message.channel.sendTyping();
        let downloadResult = await this.downloadImage(url, path.resolve(directory, "input.png"));
        if(downloadResult.value != this.ERROR_CODES.SUCCESS){
            if(downloadResult.value === this.ERROR_CODES.FETCH_ERROR){
                message.channel.send(`Failed to download the provided image, got error '${downloadResult.errorMessage}'`);
            }else if (downloadResult.value === this.ERROR_CODES.HTTP_ERROR){
                message.channel.send(`Failed to download the provided image, got response status '${downloadResult.errorMessage}'`);
            }else if(downloadResult.value === this.ERROR_CODES.NOT_IMAGE){
                message.channel.send(`The provided url was not an image.`)
            }
            fs.rmSync(`${directory}`, {recursive: true})
            return;
        }


        const commandArgs = [tdossTemplate, "\\(", `${directory}/input.png`, "-resize", "800x800^", "-gravity", "center", "-extent", "1000x1000", "\\)", "-compose", "dst-over", "-composite", `${directory}/tdoss_result.png`]
        if (executeCommand("magick", commandArgs).error === true) {
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
    // https://stackoverflow.com/a/77210219
    async downloadImage(url, path) { 
        let res;
        try {
            res = await fetch(url);
        } catch (error) {
            return {value: this.ERROR_CODES.FETCH_ERROR, errorMessage: error.cause?.message || error.message};
        }
        if(!res.ok) return {value: this.ERROR_CODES.HTTP_ERROR, errorMessage: res.status.toString()};
        const contentType = res.headers.get('content-type');
        if(!contentType || !contentType.startsWith("image")) return {value: this.ERROR_CODES.NOT_IMAGE, errorMessage: contentType || "No content-type header"};
        const stream = Readable.fromWeb(res.body)
        await writeFile(path, stream);
        return {value: this.ERROR_CODES.SUCCESS, errorMessage: ""};
    },
    ERROR_CODES: {
        SUCCESS: 0,
        HTTP_ERROR: 1,
        NOT_IMAGE: 2,
        FETCH_ERROR: 3
    }

}
