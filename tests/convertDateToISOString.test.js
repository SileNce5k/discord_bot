const convertDateToISOString = require('../util/convertDateToISOString');


let dates = [new Date("2020-01-01"), new Date(0), new Date(5600000), new Date(1000200000000)]
let expectedDateStrings = ["2020-01-01 00:00:00", "1970-01-01 00:00:00", "1970-01-01 01:33:20", "2001-09-11 09:20:00"]
for (let i = 0; i < dates.length; i++) {

    test('Converts to human readable date string', () => {
            expect(convertDateToISOString(dates[i])).toBe(expectedDateStrings[i]);
    });

}
