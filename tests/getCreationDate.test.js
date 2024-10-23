const getCreationDate = require('../util/getCreationDate');

const users = [
    { user: { createdAt: new Date("2016-01-29T14:47:58.915Z") } },
    { user: { createdAt: new Date("2018-08-20T15:51:47.090Z") } },
    { user: { createdAt: new Date("2019-04-08T21:08:11.212Z") } }

]

const humanReadableTime = [
    "2016-01-29 14:47:58",
    "2018-08-20 15:51:47",
    "2019-04-08 21:08:11"
]


test('Testing getCreationDate', () => {
    for(let i = 0; i < users.length; i++){
        expect(getCreationDate(users[i])).toBe(humanReadableTime[i])
    }
    
});