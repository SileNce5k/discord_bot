const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs')

module.exports = {
    name: 'dl',
    description: 'Download a video',
    moreHelp: [
        "Usage: <prefix>dl <url>"
    ],
    async execute({message, args}) {
        const downloadsDir = path.resolve(process.cwd(), 'data', 'downloads', Math.floor(new Date).toString());
        const cookieFilepath = path.resolve(process.cwd(), 'data', 'cookies.txt')
        fs.mkdirSync(downloadsDir, {recursive: true});
        
        let url;
        
        if(args.length > 0){
            if(args[0].charAt(0) === '<' && args[0].charAt(args[0].length - 1) === '>'){
                args[0] = args[0].slice(0, args[0].length - 1)
            }
            try {
                url = new URL(args[0]);
                url = url.href;
            } catch (error) {
                this.cleanUp(downloadsDir);
                message.channel.send("Could not parse the provided argument as a URL.");
                return;
            }
        } else {
            this.cleanUp(downloadsDir);
            return message.channel.send("You have to provide a URL in an argument.")
        }
        
        if(this.executeCommand(`yt-dlp "${url}" -P ${downloadsDir} --cookies ${cookieFilepath}`).error){
            message.channel.send("An error occured when downloading the video.");
            this.cleanUp(downloadsDir);
            return;
        }
        

        let files = fs.readdirSync(downloadsDir);
        if(files < 1) {
            this.cleanUp(downloadsDir);
            message.channel.send("Something went wrong when downloading the video.")
            return;
        }
        const filename = files[0];

        await message.channel.send({files: [{
            attachment: path.resolve(downloadsDir, filename)
        }]})

        this.cleanUp(downloadsDir);

        
    },

    cleanUp(downloadsDir){
        fs.rmSync(downloadsDir, {force: true, recursive: true});
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
    
}