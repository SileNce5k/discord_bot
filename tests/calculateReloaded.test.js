const calculateReloaded = require('../util/calculateReloaded')

let client = {commands: new Map()};
for(let i = 0; i < 10; i++){
    client.commands.set(i, i * 420);
}
let beforeSizes = [0, 12, 10, 9, 11, 6, 104];
let expectedResults = [
    `10 modules were added, and a total of 10 were reloaded.`,
    `10 modules were reloaded after 2 were disabled.`,
    `10 modules were reloaded.`,
    `1 module was added, and a total of 10 were reloaded.`,
    `10 modules were reloaded after 1 module was deleted.`,
    `4 modules were added, and a total of 10 were reloaded.`,
    `10 modules were reloaded after 94 were disabled.`
]

if(beforeSizes.length != expectedResults.length) throw "Error: beforeSizes and expectedResults are unequal length"
test('calculateReloaded test', () => {
    for(let i = 0; i < beforeSizes.length; i++){
        expect(calculateReloaded(beforeSizes[i], client)).toBe(expectedResults[i])
    }
});
