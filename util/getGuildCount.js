module.exports = function(client){
	let guildCount = 0;
		client.guilds.cache.each(() => {
			guildCount++
		});

	return guildCount;
}