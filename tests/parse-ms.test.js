const parseMS = require('../util/parseMS')
const fs = require('fs')

const file = 'tests/expected/parse-ms-expected.json';
const expectedOutput = JSON.parse(fs.readFileSync(file, {encoding: "utf-8"}));

test("Testing my parseMS", () => {
    for(let i = 0; i < expectedOutput.length; i++){
        const ms = i * i * 2;
        expect(parseMS(ms)).toStrictEqual(expectedOutput[i])        
    }
})