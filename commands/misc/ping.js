module.exports = {
	name: 'ping',
	description: 'Just ping.',
	async execute({message, client}) {
		let apiLatency = client.ws.ping;
		const time = process.hrtime.bigint();
		let initialMessage = await message.channel.send(`Pong.`)
		const diff = Number(process.hrtime.bigint() - time) * 1e-6;
		initialMessage.edit(`Pong.\nAPI latency: ${apiLatency} ms\nMessage latency: ${diff.toFixed(0)} ms.`);
	}
};