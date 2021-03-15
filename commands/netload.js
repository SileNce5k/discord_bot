const https = require('https');
const fs = require('fs')
const netloadDir = "./netload"
const validUrl = require('valid-url');

module.exports = {
    name: 'netload',
    description: 'Load a module from the internet',
    execute({ message, args, prefix }) {

        if (!args[0] && message.attachments.size == 0) {
            message.channel.send(`You have to either specify a url or upload a file via the command.\nTo get an example file, execute \`${prefix}netload example\``)
            return;
        } if (args[0] == "example") {
            message.channel.send({ files: [{ attachment: "./commands/.example" }] })
            return;
        }
        let url, fileName;
        if (message.attachments.size > 0) {
            url = message.attachments.first().url
            fileName = message.attachments.first().name
        }
        else {
            url = args[0]
            if (!validUrl.isUri(url)) {
                message.channel.send("This does not look like a valid url")
                return;
            }
            fileName = args[0].split("/")[args[0].split("/").length - 1]
        }
        if (!fs.existsSync(netloadDir)) fs.mkdirSync(netloadDir);
        if (fs.existsSync(`${netloadDir}/${fileName}`)) {
            message.channel.send(`A module with this filename(${fileName}) already exists.`)
            return;
        }
        https.get(url, (res) => {

            res.on('data', (d) => {
                fs.writeFileSync(`${netloadDir}/${fileName}`, d);
            });

        }).on('error', (e) => {
            message.channel.send("Error download file.");
            console.log(e)
        });


    }
};

