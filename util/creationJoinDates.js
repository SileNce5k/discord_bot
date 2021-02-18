module.exports = function (client) {
    let creationDate = client.user.createdAt
    let hour = creationDate.getHours().toString();
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    let minutes = creationDate.getMinutes().toString();
    if (minutes.length == 1) {
        minutes = "0" + minutes;
    }
    let seconds = creationDate.getSeconds().toString();
    if (seconds.length == 1) {
        let seconds = "0" + seconds;
    }

    let month = (creationDate.getMonth() + 1).toString();
    if (month.length == 1) {
        month = "0" + month;
    }

    let date = creationDate.getDate().toString();
    if (date.length == 1) {
        date = "0" + date;
    }
    creationDate = creationDate.getFullYear() + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + seconds;


    let datejoin = user.joinedAt;
    month = (datejoin.getMonth() + 1).toString();
    if (month.length == 1) {
        month = "0" + month;
    }

    date = datejoin.getDate().toString();
    if (date.length == 1) {
        date = "0" + date;
    }

    hour = datejoin.getHours().toString();
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    minutes = datejoin.getMinutes().toString();
    if (minutes.length == 1) {
        minutes = "0" + minutes;
    }
    seconds = datejoin.getSeconds().toString();
    if (seconds.length == 1) {
        seconds = "0" + seconds;
    }

    let joindate = datejoin.getFullYear() + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + seconds;

    return { datecreate: creationDate, joindate: joindate };
}