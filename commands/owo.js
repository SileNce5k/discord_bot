const owo = require('@zuzak/owo')
module.exports = {
	name: 'owo', 
	description: 'Translate to furry/weeb language',
	execute({message, args}) { 
		let msg = args.join(" ")
		message.channel.send(owo.translate(msg));
	}
};
