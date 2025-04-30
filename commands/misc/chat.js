require("dotenv").config();

module.exports = {
	name: 'chat',
	description: 'A chat command that uses an LLM to answer your prompts (server must be whitelisted)',
	needsWhitelist: true,
	async execute({ message, args }) {

		if(args.length === 0){ 
			message.channel.send("You have to set your prompt in the arguments");
			return;
		}
		const prompt = args.join(" ");
		let answer = "";
		const initialMessage = await message.channel.send("Generating response... This may take a moment.")
        message.channel.sendTyping();
		// TODO: More configuration. Have a basic setup but allow setting system prompt, max tokens and model.
		await fetch(`https://openrouter.ai/api/v1/chat/completions`, {
			method: `POST`,
			headers: {
				"Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
				"Content-Type": `application/json`
			},
			body: JSON.stringify({
				"model": `deepseek/deepseek-chat-v3-0324:free`,
				"messages": [
					{
						"role": `user`,
						"content": prompt
					}
				],
				"max_tokens": 250
			})
		}).then(response => response.json()).then(data => {
			answer = data.choices[0].message.content;
		}).catch(error => {
			console.error(error);
		});
		if(answer.length > 0){
			if(answer.length > 1999){
				initialMessage.edit("Unfortunately the length of the message was longer than what discord allows.")
			}
			initialMessage.edit(answer)
		}else {
			initialMessage.edit("Something went wrong. The owner should check the console.")
		}
	}
};