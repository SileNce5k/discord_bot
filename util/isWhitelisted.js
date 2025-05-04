// type: 0 for both, 1 for guild, 2 for userId, 3 for either.
function isWhitelisted(command, whitelist, guildId, userId, type=0){
    const isGuildWhitelisted = Boolean(whitelist.guild.get(guildId)?.includes(command))
    if(type === whitelistTypes.GUILD_ONLY) return isGuildWhitelisted;
    if(type === whitelistTypes.BOTH && !isGuildWhitelisted) return false;
    if(type === whitelistTypes.EITHER && isGuildWhitelisted) return true;
    const isUserWhitelisted = Boolean(whitelist.user.get(userId)?.includes(command))
    if(type === whitelistTypes.USER_ONLY) return isUserWhitelisted;
    if(type === whitelistTypes.BOTH && isGuildWhitelisted && isUserWhitelisted) return true;
    if(type === whitelistTypes.EITHER && (isGuildWhitelisted || isUserWhitelisted)) return true;
    return false;
}

const whitelistTypes = {
    BOTH: 0,
    GUILD_ONLY: 1,
    USER_ONLY: 2,
    EITHER: 3
}


module.exports = {isWhitelisted, whitelistTypes}