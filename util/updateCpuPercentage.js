const os = require('os');
const updateCpuPercentage = require('./updateCpuPercentage');
module.exports = async function (processInfo) {
    const newCpuUsage = process.cpuUsage(processInfo.cpuPercentage);
    processInfo.previousCpuUsage = process.cpuUsage();
    processInfo.cpuPercentage = (newCpuUsage.system + newCpuUsage.user) / 60_000_000 / os.cpus().length;

    setTimeout(updateCpuPercentage, 60000, processInfo);
}

