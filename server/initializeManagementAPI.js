// This is a sample implementation of the bot client. Refer to this when implementing for your own discord bot
// This bot obviously doesn't connect to discord and is mostly for testing to see if the http backend works as expected before implementing onto soilens_bot (v2).
// See https://github.com/SileNce5k/discord_bot/blob/server/initializeManagementAPI.js for an actual implementation (deployed @ discord.silence5k.com).

const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
const fs = require('fs')
const update = require('../util/update');
function initializeClientDatabase() {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS log (
            timestamp INTEGER PRIMARY KEY,
            entry TEXT
        )`
    ).run()
    db.prepare(`
        CREATE TABLE IF NOT EXISTS error (
            timestamp INTEGER PRIMARY KEY,
            entry TEXT
        )`
    ).run()
    db.prepare(`
        CREATE TABLE IF NOT EXISTS config (
            name TEXT PRIMARY KEY,
            value TEXT,
            nValue INTEGER
        )`
    ).run();
}
function initializeManagementAPI(client, bot) {
    const app = express();
    const port = 3001;
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser())
    const databasePath = path.join(__dirname, "..", "data", "management.db") // TODO: Get a better name for the db file
    const db = require('better-sqlite3')(databasePath)
    db.pragma('journal_mode = WAL');
    initializeClientDatabase();
    app.use((req, res, next) => {
        // Do authentication & stuff here
        next();
    })
    
    app.post('/api/v1/restart', (req, res) => {
        bot.log("Restarting is NOT IMPLEMENTED") // I think what I want to do here is have a Go server that only listens for /api/v1/restart
                                                 // Then it would have the node server as a child which it would then send a signal to '
                                                 // then shut itself down, and then the go server would start the node server again.
        res.status(200).send({ message: "NOT IMPLEMENTED" });
        // Implement restarting and stuff..
    })
    app.post('/api/v1/update', (req, res) => {
        update(client)
        // Implement updating, then send the normal discord message but in logs.
        bot.log("Updating the bot.")
        res.status(200).send({ message: "Updating.", check: 2 })
    })
    
    app.get('/api/v1/logs', (req, res) => { // Log entries on the bot side should have a unique number (unix timestamp)
        // Bot will keep a buffer of logs. (maybe a database table?)
        // Bot can clean up logs on startup.
        // The backend management server queries the server with the last timestamp it has
        // Then the bot backend sends all logs after this timestamp and also sends the timestamp of the newest log entry.
    
        if (!req.headers["last-log-time"]) {
            res.status(400).send({ message: "Required header Last-Log-Time not provided" })
            return;
        }
        const logs = bot.getAllAfter(parseInt(req.headers["last-log-time"]))
        let lastLogTime = req.headers["last-log-time"];
        if (logs.length > 0) {
            lastLogTime = logs[0].timestamp;
        }
        let response = {
            logs: logs,
            lastLogTime: lastLogTime,
        }
        res.status(200).send(response)
    })
    
    app.get('/api/v1/health_check', (req, res) => { // Some information would be provided here. Like total commands since start of bot. Uptime in seconds. 
        const response = {
            uptime: 34,
            commandsSinceStart: 35
        }
        res.status(200).send(response)
    })
    
    // Config files could be anything so the server should account for that.
    app.get('/api/v1/download-config', async (req, res) => {
        const filename = "sample-config.json"
        const configFile = await fs.promises.readFile(path.join(__dirname, "..", "data", filename), {encoding: 'binary'})
        if (configFile) {
            const headers = new Headers({
                'Content-Disposition': `attachment; filename="${filename}"`
            })
            res.status(200).setHeaders(headers).sendFile(path.join(__dirname, "..", "data", filename));
            return;
        }
        res.status(404).send("Config file could not be read.") // TODO: Find a better http status code
        
    })
    
    app.post('/api/v1/custom-command', (req, res) => {
        if (!req.body.command) res.status(500).send("No command supplied.");
        if (commandHandler(req.body.command)) {
            res.status(200).send({ message: "Command executed" })
        } else {
            res.status(500).send({ message: "No such command exists" })
        }
    })
    const server = app.listen(port, (err) => {
        if (err) {
            console.error(`Could not start server on port ${port}, got ${err.code}.`)
            return "TODO: something"
        }
        console.log(`INFO: sample_client started at http://127.0.0.1:${port}`);
    })
}




// This is an example of a logging function that would replace console.log in your projects.
// But I wouldn't actually overwrite console.log like this.
// You might not want logs on the express server to appear on the bot website.
// So it is probably better to just name this something else. You could have a bot class, 
// then have bot.log bot.error bot.warn as functions of that class and so on.

// This is an example of a logging class you can use.
// So you'd use these logging methods on the "bot parts" and you don't have to overwrite console.log and such.

// TODO: Use a database table so that logs don't get lost on restarts. The constructor could load the last MAX_SIZE logs into the arrays.

// This class can 100% lose information right now. But how?
// 







function commandHandler(commandString) { // These commands should be implemented the same way as the discord bot commands.
    const command = commandString.split(" ")[0];
    const args = commandString.split(" ").slice(1);
    switch (command.toLowerCase()) {
        case "restart":
            bot.log("Restarting the bot.");
            return true;
        case "update":
            bot.log("Updating the bot.")
            return true;
        case "say":
            let channelId = args[0];
            let message = args.slice(1);
            bot.log(`Said "${message.join(" ")}" in channel: '${channelId}'`)
            return true;
        case "error":
            bot.error(`Error testing: ${args.join(" ")}`);
            return true;
        case "dbsyncrate":
            if(args.length > 0 && !isNaN(args[0])){
                const ms = parseInt(args[0]);
                if(isNaN(ms)) {
                    bot.log("An argument is required for dbsyncrate");
                    return true;
                }
                if(ms >= 2000 || ms <= 100){
                    bot.log("The number must be between 100 and 2000 (inclusive)");
                    return true;
                }
                bot.updateSyncRate(ms);
                bot.log(`The database sync rate has been updated to ${ms} milliseconds`)
            }else {
                bot.log("A number in argument is required")
            }
            return true;
        case "help":
            bot.log(`Commands:\nrestart: Restart the bot\nupdate: Update the bot\nsay: say something in a channel (channel in first arg)\nerror: test error logging\ndbsyncrate <num_in_ms> to change db sync rate\nhelp: get this help text.`)
        default:
            return false;
    }
}

export default initializeManagementAPI;


// TODO: Use this in server.js and stuff.
// process.on('SIGINT', () => {
//     console.log("Exiting safely...");
//     server.close();
//     bot.updateDb();
//     db.close();
//     process.exit();
// });
