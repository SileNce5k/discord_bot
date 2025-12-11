const calculateReloaded = require("./calculateReloaded");
const executeCommand = require("./executeCommand");
const reloadCommands = require("./reloadCommands");

module.exports = function(client, bot){
    let text = "";
    let updateInfo = executeCommand("git", ["pull", "--ff-only"]);
    if(updateInfo.error) {
        bot.error(stderr);
        return "Something went wrong..."
    }else if(updateInfo.output.startsWith("Already up to date.")){
        text = "Already up to date.\nNo updating needed."
        return text;
    }
    else {
        const githash = executeCommand(`git`, ["rev-parse", "--short", "HEAD"]);
        client.githash = githash.error ? "N/A" : githash.output;
        let beforeSize = client.commands.size;
        reloadCommands(client);
        let reloadedText = calculateReloaded(beforeSize, client);
        text = `${updateInfo.output}\nBot updated, and\n${reloadedText}`
        if(updateInfo.output.includes("server.js") || updateInfo.output.includes("server/")){
            text = text + "\nServer.js OR a file the server/ directory has been updated.\nThis requires the bot to be restarted."
        }
        const regex = /([^\s]+)\.\.([^\s]+)/
        let commits = updateInfo.output.match(regex)[0]
        const gitLog = executeCommand("git", ["log", "--oneline", commits]);
        let commitCount = gitLog.output.split(/\r\n|\r|\n/).length - 1
        text = `${text}\n\nLatest commits (${commitCount}):\n${gitLog.output}`;
        if(text.length >= 2000) {
            text = text.slice(1955);
            text = `${text}\n... Message is too long to show everything`
        }
        return text;
    }
}
