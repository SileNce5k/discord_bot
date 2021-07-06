const Srand = require('seeded-rand');
const parseMention = require('../util/parseMention')
module.exports = {
	name: 'penissize', // Keep it to one word
	description: 'Get your penis size',
	execute({message, args}) { //parameters you can use for netload: message, args, client, prefix 
		let info;
		let isSelf = true;
		if (!args[0]) {
			info = message.author.id;
		} else {
			info = parseMention(args[0], message.guild);
			isSelf = false
		}
		
		const rnd = new Srand();
		rnd.seed(parseInt(info))
		let penisSize = rnd.inRange(1, 45).toFixed(2)
		let penisSizeInches = (penisSize * 0.3937008).toFixed(2);
		let name = "Your";
		if(!isSelf){
			let user = message.guild.members.cache.get(info);
			name = user.user.username
		}

		message.channel.send(`Your penis size is ${penisSize} cm, or ${penisSizeInches} inches`);
	}
};
