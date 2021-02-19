module.exports = function (user) {
    let creationMonth, creationDate, creationHours, creationMinutes, creationSeconds;

    if (user.createdAt.getUTCMonth().toString().length === 1)
        creationMonth = "0" + user.createdAt.getUTCMonth()
    else
        creationMonth = user.createdAt.getUTCMonth()

    if (user.createdAt.getUTCDate().toString().length === 1)
        creationDate = "0" + user.createdAt.getUTCDate()
    else
        creationDate = user.createdAt.getUTCDate()

        if (user.createdAt.getUTCHours().toString().length === 1)
        creationHours = "0" + user.createdAt.getUTCHours()
    else
        creationHours = user.createdAt.getUTCHours()


        if (user.createdAt.getUTCMinutes().toString().length === 1)
        creationMinutes = "0" + user.createdAt.getUTCMinutes()
    else
        creationMinutes = user.createdAt.getUTCMinutes()


        if (user.createdAt.getUTCSeconds().toString().length === 1)
        creationSeconds = "0" + user.createdAt.getUTCSeconds()
    else
        creationSeconds = user.createdAt.getUTCSeconds()

    
    let creation = `${user.createdAt.getUTCFullYear()}-${creationMonth}-${creationDate} ${creationHours}:${creationMinutes}:${creationSeconds}`
    return { creation: creation }
}