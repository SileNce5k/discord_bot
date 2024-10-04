module.exports = {
	name: 'convert', 
	description: 'Convert a value to another value',
	moreHelp: [
		"To convert celsius to fahrenheit:",
		"<prefix>convert 20 C F"
	],
	execute({message, args}) { 
		if(args.length < 3){
			message.channel.send("Not enough arguments");
			return;
		}
		if(args[2] === "to" && args.length > 3){
			args[2] = args[3];
		}
		let sendText = "";
		let initial_temp = parseFloat(args[0])
		switch (args[1].toUpperCase()) {
			case "C":
				if (args[2].toUpperCase() === "F") {
					let fahrenheit = ((initial_temp * 9 / 5) + 32).toFixed(2); 
					if(fahrenheit[fahrenheit.length - 1] === '0' && fahrenheit[fahrenheit.length - 2] === "0"){
						fahrenheit = fahrenheit.replace(".00","")
					}

					sendText = `${initial_temp}°C is ${fahrenheit}°F`;
				} else {
					sendText = "Can only convert to celsius from fahrenheit";
				}
				break;
			case "F":
				if (args[2].toUpperCase() === "C") {
					const celsius = ((initial_temp - 32) * 5 / 9).toFixed(2);
					sendText = `${initial_temp}°F is ${celsius}°C`;
				} else {
					sendText = "Can only convert to fahrenheit from celsius";
				}
				break;
			default:
				sendText = "No conversion method for that yet"
				break;
		}
		message.channel.send(sendText);

	}
};
