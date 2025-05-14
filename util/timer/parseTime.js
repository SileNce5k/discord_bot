module.exports = function(time, currentUnixTime){
	let timeInSeconds = parseFloat(time)
	const letterCount = time.length - timeInSeconds.toString().length;
	let letter = time.slice(time.length - letterCount);
	switch (letter.toUpperCase()) {
		case "H":
			timeInSeconds = timeInSeconds * 3_600;
			break;
		case "M":
			timeInSeconds = timeInSeconds * 60;
			break;
		case "S":
			break;
		case "D":
			timeInSeconds = timeInSeconds * 86_400;
			break;
		case "TS": // Unix timestamp
		case "T":
			timeInSeconds = timeInSeconds - currentUnixTime;
			break;
		case "W":
			timeInSeconds = timeInSeconds * 86_400 * 7;
			break;
		default:
			timeInSeconds = NaN;
	}
	return timeInSeconds;
}
