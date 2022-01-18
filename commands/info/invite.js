module.exports = {
    name: 'invite',
    description: 'Returns invite link for the bot',
    execute({message, client}){
        const inviteLink = client.generateInvite({
            scopes: ['applications.commands'],
          });
          message.channel.send(`<${inviteLink}>`)
    }
}