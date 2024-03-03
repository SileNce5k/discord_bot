module.exports = function (client, timer) {
	client.channels.cache.get(timer.channel).send(`<@${timer.user}>, your timer (ID: ${timer.ID}) is up!\nCustom message:\n"${timer.customMessage}"`);
}