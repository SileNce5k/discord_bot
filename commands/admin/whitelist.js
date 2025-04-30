const sqlite3 = require('sqlite3').verbose();

module.exports = {
    name: 'whitelist',
    description: 'Whitelist a command in a specific server.',
    admin: true,
    async execute({message, args, prefix, client}) {
        if(args.length < 2){
            message.channel.send(`You need to supply the command and channel that you want to whitelist\n\`${prefix}whitelist <command> <server_id>\``);
            return;
        } 
        let command = args[0];
        let guild = args[1];
        if(guild === "this") guild = message.guild.id;
        // TODO: Add ability to remove server from whitelist.
        const whitelistedCommands = client.whitelist.get(guild);
        if(whitelistedCommands && whitelistedCommands.includes(command)){
            message.channel.send("Command is already whitelisted in that server.")
            return;
        }
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
        if(!err){
            if(whitelistedCommands){
                whitelistedCommands.push(command);
			    client.whitelist.set(guild, whitelistedCommands);
            }else {
                client.whitelist.set(guild, command);
            }
            message.channel.send("Command has been whitelisted in that server.")

        } else message.channel.send("Could not whitelist the server with that command. Check the logs.")
    }
};