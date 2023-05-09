const fs = require('fs');

module.exports = function (client, authorID, timerID) {
    let timerToShow = client.timers.find(timer => timer.ID === parseInt(timerID));
    if (timerToShow === undefined)
        return "Timer not found";
    if (timerToShow.user !== authorID){
        return "You can only show info about your own timers.";
    }
    return `${timerToShow.ID} will remind you <t:${timerToShow.reminderDate.toFixed(0)}:R> (<t:${timerToShow.reminderDate.toFixed(0)}:f>) with the message "${timerToShow.customMessage}"`;
    
}
