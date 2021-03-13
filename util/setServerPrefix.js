const fs = require('fs');


module.exports = function (client, newPrefix, guildID) {
    let isExists = false;
    const json = fs.readFileSync('serverPrefixes.json', 'utf8');
    const serverPrefixes = JSON.parse(json);
    serverPrefixes.forEach(function (server) {
        if (server.id === guildID) {
            server.prefix = newPrefix
            client.serverPrefixes.set(server.id, newPrefix)
            fs.writeFileSync("serverPrefixes.json", JSON.stringify(serverPrefixes));
            isExists = true;
        }
    });
    if (!isExists) {
        let _newPrefix = {
            "id": guildID, "prefix": newPrefix
        }

        serverPrefixes.push(_newPrefix)
        fs.writeFileSync("serverPrefixes.json", JSON.stringify(serverPrefixes))
        client.serverPrefixes.set(guildID, newPrefix)
    }
}