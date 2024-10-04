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
		let sendText = "";
		switch (args[1].toUpperCase()) {
			case "C":
				if (args[2].toUpperCase() === "F") {
					const fahrenheit = ((parseFloat(args[0]) * 9 / 5) + 32).toFixed(2); 
					sendText = `${args[0]}°C is ${fahrenheit}°F`;
				} else {
					sendText = "Can only convert to celsius from fahrenheit";
				}
				break;
			case "F":
				if (args[2].toUpperCase() === "C") {
					const celsius = ((parseFloat(args[0])  - 32) * 5 / 9).toFixed(2);
					sendText = `${args[0]}°F is ${celsius}°C`;
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