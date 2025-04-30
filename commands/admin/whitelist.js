const sqlite3 = require('sqlite3').verbose();

module.exports = {
    name: 'whitelist',
    description: 'Whitelist different commands that need whitelisting.',
    admin: true,
    async execute({message, args, prefix}) {
        if(args < 2){
            message.channel.send(`You need to supply the command and channel that you want to whitelist\n\`${prefix}whitelist <command> <server_id>\``);
            return;
        } 
        let command = args[0];
        let guild = args[1];
        // TODO: First check if the bot has access to that guild before whitelisting.
        const databasePath = 'data/database.db'
        const db = new sqlite3.Database(databasePath)
        let err = false;
        await new Promise((resolve, reject)=>{
            db.run(`INSERT INTO whitelist (
                serverId, 
                command,
                dateAdded
                ) VALUES (?, ?, ?)`, 
                [
                    guild,
                    command,
                   new Date().getTime()
                ], function (error) {
                if (error) {
                    console.error(error);
                    err = true;
                    resolve();
                }else{
                    resolve();
                }
            });
        })
        if(!err)
            message.channel.send("Command has been whitelisted in this server.")
        else message.channel.send("Could not whitelist the server with that command. Check the logs.")
    }
};