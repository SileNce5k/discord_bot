module.exports = function (client, timer) {
	client.channels.cache.get(timer.channel).send(`<@${timer.user}>, ${timer.customMessage}`);
}