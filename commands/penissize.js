let seedrandom = require('seedrandom');
const parseMention = require('../util/parseMention')
module.exports = {
	name: 'penissize', 
	description: 'Get penis size',
	execute({message, args}) { 
		let info;
		let isSelf = true;
		if (!args[0]) {
			info = message.author.id;
		} else {
			info = parseMention(args[0], message.guild);
			isSelf = false
		}
		let rng = seedrandom(info.toString())
		let max = 45;
		let min = 1;
		let rnd = rng() * (max - min + 1) + min;
		let penisSize = rnd.toFixed(2)
		let penisSizeInches = (penisSize * 0.3937008).toFixed(2);
		let name = "Your";
		if(!isSelf){
			let user = message.guild.members.cache.get(info);
			name = user.user.username+"'s"
		}

		message.channel.send(`${name} penis size is ${penisSize} cm, or ${penisSizeInches} inches`);
	}
};
