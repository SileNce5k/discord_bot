const fs = require('fs')
const filepath = 'commands/'


module.exports = function (client) { //TODO: Add ability to reload specified commands with arguments

    let commandFiles = fs.readdirSync(filepath).filter(file => file.endsWith('.js'));
    if (client.commands.size != 0) {
        for (const i of commandFiles) {
            console.log(i)
            delete require.cache[require.resolve(`../${filepath}${i}`)];
        }
    }

    console.log(client.commands.size)
    client.commands.clear()
    console.log("test")

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.name, command);
    }


    //console.log(require.cache[require.resolve('../commands')])
}

