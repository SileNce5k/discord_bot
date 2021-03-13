const setServerPrefix = require("../util/setServerPrefix");

module.exports = {
    name: 'prefix',
    description: 'Change the prefix of the bot in this server.',
    execute({ message, client, args, prefix }) {
        if (!args[0]) {
            message.channel.send(`To change the prefix, execute \`${prefix}prefix <newPrefix>\``);
            return;
        }else{
            setServerPrefix(client, args[0], message.guild.id)
            message.channel.send(`The prefix for this server is now set to ${args[0]}`)
        }
    }
};