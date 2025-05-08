const getGuildInfo = require('../util/getGuildInfo');



test("Testing getGuildCount", () => {
    for(let i = 1; i < 200000; i = i+i*30 ){
        let client = {guilds: {cache: new Map()}}
        client.guilds.cache.each = client.guilds.cache.forEach;

        for(let j = 0; j < i; j++){
            client.guilds.cache.set(`num: ${j}`, j);
        }
        
        expect(getGuildInfo(client).guildCount).toBe(i);
        
    }
})