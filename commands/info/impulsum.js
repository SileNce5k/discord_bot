const impulsumStatus = require('../../util/impulsumStatus')

module.exports = {
    name: "impulsum",
    description: "Check how many people are online on impulsum servers",
    needsWhitelist: true,
    async execute({message}) {
       
        let msg = await impulsumStatus().catch((err) => {
            console.log(err);
            if(msg === "") msg = "An error occured while trying to get the status of the impulsum servers.\nCheck server logs for more information."
        });

        message.channel.send(msg);
    }

}