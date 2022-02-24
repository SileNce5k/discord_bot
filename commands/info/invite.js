module.exports = {
    name: 'invite',
    description: 'Returns invite link for the bot',
    execute({message, client}){
        const inviteLink = client.generateInvite({
            scopes: ['applications.commands', 'bot'],
          });
          message.channel.send(`<${inviteLink}>`)
    }
}