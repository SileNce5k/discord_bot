module.exports = function(time, currentUnixTime){
	let timeInSeconds = parseFloat(time.slice(0, time.length - 1))
	let letter = time.slice(time.length - 1)
	if(!isNaN(letter)) return parseFloat(time) * 60;
	switch (letter.toUpperCase()) {
		case "H":
			timeInSeconds = timeInSeconds * 3600;
			break;
		case "M":
			timeInSeconds = timeInSeconds * 60;
			break;
		case "S":
			break;
		case "D":
			timeInSeconds = timeInSeconds * 86400;
			break;
		case "T": // TODO: Make it so that I can have multiple letters per case, so that "TS" would work here.
			timeInSeconds = timeInSeconds - currentUnixTime;
			break;
		default:
			timeInSeconds = NaN;
			if(time.includes(':')) 
				timeInSeconds = getTime(time, currentUnixTime); 
	}
	return timeInSeconds;
}



function getTime(time, currentUnixTime) {
	


	return timeInSeconds;
}
