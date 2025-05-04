const isWhitelisted = require('../util/isWhitelisted');

const whitelist = {
    guild: new Map(),
    user: new Map()
}
whitelist.guild.set(20, ["test1", "test3"]);
whitelist.guild.set(21, ["test2", "test4"]);
whitelist.user.set(1001, ["test1", "test3"]);
whitelist.user.set(1002, ["test2", "test4"]);

test('Test isWhitelisted', () => {
        expect(isWhitelisted.isWhitelisted("test1", whitelist, 20, 1001, isWhitelisted.whitelistTypes.BOTH)).toBe(true);
        expect(isWhitelisted.isWhitelisted("test3", whitelist, 20, 1002, isWhitelisted.whitelistTypes.BOTH)).toBe(false);
        expect(isWhitelisted.isWhitelisted("test3", whitelist, 21, 1001, isWhitelisted.whitelistTypes.BOTH)).toBe(false);

        expect(isWhitelisted.isWhitelisted("test1", whitelist, 20, 1001, isWhitelisted.whitelistTypes.USER_ONLY)).toBe(true);
        expect(isWhitelisted.isWhitelisted("test1", whitelist, 21, 1001, isWhitelisted.whitelistTypes.USER_ONLY)).toBe(true);
        expect(isWhitelisted.isWhitelisted("test1", whitelist, 20, 1002, isWhitelisted.whitelistTypes.USER_ONLY)).toBe(false);

        expect(isWhitelisted.isWhitelisted("test4", whitelist, 20, 1001, isWhitelisted.whitelistTypes.GUILD_ONLY)).toBe(false);
        expect(isWhitelisted.isWhitelisted("test4", whitelist, 21, 1001, isWhitelisted.whitelistTypes.GUILD_ONLY)).toBe(true);
        expect(isWhitelisted.isWhitelisted("test4", whitelist, 21, 1002, isWhitelisted.whitelistTypes.GUILD_ONLY)).toBe(true);

        expect(isWhitelisted.isWhitelisted("test1", whitelist, 20, 1002, isWhitelisted.whitelistTypes.EITHER)).toBe(true);
        expect(isWhitelisted.isWhitelisted("test2", whitelist, 20, 1002, isWhitelisted.whitelistTypes.EITHER)).toBe(true);
        expect(isWhitelisted.isWhitelisted("test3", whitelist, 21, 1001, isWhitelisted.whitelistTypes.EITHER)).toBe(true);
        expect(isWhitelisted.isWhitelisted("test4", whitelist, 20, 1001, isWhitelisted.whitelistTypes.EITHER)).toBe(false);
        
});
