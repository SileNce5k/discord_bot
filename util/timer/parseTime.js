module.exports = function(time){
	let timeInSeconds = parseFloat(time.slice(0, time.length - 1))
	let letter = time.slice(time.length - 1)
	if(!isNaN(letter)) return parseFloat(time) * 60;
	switch (letter.toUpperCase()) {
		case "H":
			timeInSeconds = timeInSeconds * 3600;	// 3 600 000
			break;
		case "M":
			timeInSeconds = timeInSeconds * 60;		// 60 000
			break;
		case "S":
			timeInSeconds = timeInSeconds;			// 1 000
			break;
		default:
			timeInSeconds = -1;
	}
	return timeInSeconds;
}
