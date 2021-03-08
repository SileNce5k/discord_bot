const fs = require('fs')
const filepath = 'commands/'


module.exports = function (client) { //TODO: Add ability to reload specified commands with arguments

    let commandFiles = fs.readdirSync(filepath).filter(file => file.endsWith('.js'));
    if (client.commands.size != 0) {
        for (const i of commandFiles) {
            delete require.cache[require.resolve(`../${filepath}${i}`)];
        }
    }
    client.commands.clear()
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.name, command);
    }
}

