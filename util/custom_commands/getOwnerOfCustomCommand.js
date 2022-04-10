const fs = require('fs');
module.exports = function(customName){
	const customPath = './data/customCommands.json';
	let json = fs.readFileSync(customPath, 'utf8');
	let customCommands = JSON.parse(json)
	let author = customCommands.filter(customCommands => customCommands.customName === customName);
	if(author.length === 0) return false; 
	return author[0].author;
	
}