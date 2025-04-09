const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');


module.exports = {
    name: 'tdoss',
    description: 'Combine picture with tdoss album cover template',
    async execute({ message }) {
        message.channel.sendTyping();

        let dataDir = path.resolve(__dirname, '..', '..', 'data');
        const directory = path.resolve(dataDir, Math.floor(new Date).toString())
        fs.mkdirSync(directory)
        
        if(message.attachments.size > 0){
            const curlCommand = `curl "${message.attachments.first().url}" -o ${directory}/input.png` // TODO: Download with correct extension. 
            if (this.executeCommand(curlCommand).error === true) {
                message.channel.send("Something went wrong.\nTry again and if it keeps happening, contact the owner of the bot.")
                return
            }

        }else {
            message.channel.send("You have to provide an image to use this command.\nIt only works with attachments for now.")
            fs.rmSync(`${directory}`, {recursive: true})
            return
        }
        
        


        const command = `magick ${dataDir}/tdoss_template.png \\( ${directory}/input.png -resize 800x800^ -gravity center -extent 1000x1000 \\) -compose dst-over -composite ${directory}/tdoss_result.png`;
        if (this.executeCommand(command).error === true) {
            message.channel.send("Something went wrong.\nTry again and if it keeps happening, contact the owner of the bot.")
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
    }

}


