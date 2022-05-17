module.exports = function(time){
	let timeInMilliseconds = parseInt(time.slice(0, time.length - 1))
	let letter = time.slice(time.length - 1)
	if(!isNaN(letter)) return parseInt(time) * 60000
	switch (letter.toUpperCase()) {
		case "H":
			timeInMilliseconds = timeInMilliseconds * 3600000;	// 3 600 000
			break;
		case "M":
			timeInMilliseconds = timeInMilliseconds * 60000;	// 60 000
			break;
		case "S":
			timeInMilliseconds = timeInMilliseconds * 1000;		// 1 000
			break;
		default:
			timeInMilliseconds = -1;
	}
	return timeInMilliseconds;
}
