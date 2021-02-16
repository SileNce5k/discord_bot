module.exports = function (text, guild) {
    var id = "";
    var ismention = false;
    if (
        text.substring(0, 2) == "<@" &&
        text.substring(text.length - 1, text.length) == ">"
    ) {
        var start = 2;
        if (text.substring(0, 3) == "<@!") start = 3;
        id = text.substring(start, text.length - 1);
        ismention = true;
    } else {
        if (!isNaN(text)) {
            id = text;
        }
    }
    if (!ismention) {
        guild.members.cache.each(function (guildMember, guildMemberID) {
            var compare = text.toLowerCase();
            if (guildMember.user.username.toLowerCase().includes(compare)) {
                id = guildMemberID;
                return;
            }
            if (guildMember.nickname) {
                if (guildMember.nickname.toLowerCase().includes(compare)) {
                    id = guildMemberID;
                    return;
                }
            }
        });
    }
    return { id: id };

}


