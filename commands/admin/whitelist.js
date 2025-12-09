const sqlite3 = require('sqlite3').verbose();

module.exports = {
    name: 'whitelist',
    description: 'Whitelist a command in a specific server, or for a user.',
    admin: true,
    async execute({message, args, prefix, client, bot}) {
        if(args.length < 3){
            message.channel.send(`You need to supply the command and guild that you want to whitelist\n\`${prefix}whitelist <user|guild> <command> <user_id|guild_id>\``);
            return;
        } 
        let option = args[0];
        let command = args[1];
        let guildOrUser = args[2];

        if(option === "guild" || option === "server"){
            if(guildOrUser === "this") guildOrUser = message.guild.id;
            const whitelistedCommands = client.whitelist.guild.get(guildOrUser);
            if(whitelistedCommands && whitelistedCommands.includes(command)){
                message.channel.send("Command is already whitelisted in that server.")
                return;
            }
            // TODO: First check if the bot has access to that guild before whitelisting.
            const databasePath = 'data/database.db'
            const db = new sqlite3.Database(databasePath)
            let err = false;
            await new Promise((resolve, reject)=>{
                db.run(`INSERT INTO guild_whitelist (
                    guildId, 
                    command,
                    dateAdded
                    ) VALUES (?, ?, ?)`, 
                    [
                        guildOrUser,
                        command,
                       new Date().getTime()
                    ], function (error) {
                    if (error) {
                        bot.error(error);
                        err = true;
                        resolve();
                    }else{
                        resolve();
                    }
                });
            })
            db.close();
            if(!err){
                if(whitelistedCommands){
                    whitelistedCommands.push(command);
                    client.whitelist.guild.set(guildOrUser, whitelistedCommands);
                }else {
                    client.whitelist.guild.set(guildOrUser, command);
                }
                message.channel.send(`"${command}" has been whitelisted in that server.`)
    
            } else message.channel.send("Could not whitelist the server with that command. Check the logs.")
            return;
        }else if (option === "user"){
            const whitelistedCommands = client.whitelist.user.get(guildOrUser);
            if(whitelistedCommands && whitelistedCommands.includes(command)){
                message.channel.send("Command is already whitelisted for that user.")
                return;
            }
            const databasePath = 'data/database.db'
            const db = new sqlite3.Database(databasePath)
            let err = false;
            await new Promise((resolve, reject)=>{
                db.run(`INSERT INTO user_whitelist (
                    userId, 
                    command,
                    dateAdded
                    ) VALUES (?, ?, ?)`, 
                    [
                        guildOrUser,
                        command,
                       new Date().getTime()
                    ], function (error) {
                    if (error) {
                        bot.error(error);
                        err = true;
                        resolve();
                    }else{
                        resolve();
                    }
                });
            })
            db.close();
            if(!err){
                if(whitelistedCommands){
                    whitelistedCommands.push(command);
                    client.whitelist.user.set(guildOrUser, whitelistedCommands);
                }else {
                    client.whitelist.user.set(guildOrUser, command);
                }
                message.channel.send(`"${command}" has been whitelisted for ${guildOrUser}.`)
    
            } else message.channel.send("Could not whitelist the server with that command. Check the logs.")
            return;
        }

        

        // TODO: Add ability to remove server from whitelist.
    }

};