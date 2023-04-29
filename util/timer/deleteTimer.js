const fs = require('fs');

module.exports = function (client, authorID, timerID) {

    let timerToDelete = client.timers.find(timer => timer.ID === parseInt(timerID) && timer.user === authorID);
    if (timerToDelete === undefined)
        return "Timer not found";
    client.timers.splice(client.timers.indexOf(timerToDelete), 1);
    fs.writeFileSync('data/timers.json', JSON.stringify(client.timers, null, 4))
    return `Timer with ID:${timerID} deleted.`;
}
