const createTimersTable = require('./createTimersTable');
const createCustomCommandsTable = require('./createCustomCommandsTable');

module.exports = async function () {
    await createTimersTable();
    await createCustomCommandsTable();
}
