const fs = require('fs');


module.exports = function (client, newPrefix, guildID) {
    try {
        const json = fs.readFileSync('serverPrefixes.json', 'utf8');
        const serverPrefixes = JSON.parse(json);
        serverPrefixes.forEach(server => {
        if (server.id === guildID){
            server.prefix = newPrefix
            client.serverPrefixes.set(server.id, newPrefix)
            fs.writeFileSync("serverPrefixes.json", JSON.stringify(serverPrefixes)); 
        }
        });
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
}