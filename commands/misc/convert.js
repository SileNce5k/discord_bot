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
		let initial_number = parseFloat(args[0])
		switch (args[1].toUpperCase()) {
			case "C":
				if (args[2].toUpperCase() === "F") {
					let fahrenheit = ((initial_number * 9 / 5) + 32).toFixed(2); 
					if(fahrenheit[fahrenheit.length - 1] === '0' && fahrenheit[fahrenheit.length - 2] === "0"){
						fahrenheit = fahrenheit.replace(".00","")
					}

					sendText = `${initial_number} °C is ${fahrenheit} °F`;
				} else if (args[2].toUpperCase() === "K"){
					let kelvin = (initial_number + 272.15).toFixed(2);
					if (kelvin[kelvin.length - 1] === '0' && kelvin[kelvin.length - 2] === "0") {
						kelvin = kelvin.replace(".00", "")
					}

					sendText = `${initial_number} °C is ${kelvin} K`;
				}
				else {
					sendText = "Can only convert to celsius from fahrenheit";
				}
				break;
			case "F":
				if (args[2].toUpperCase() === "C") {
					let celsius = ((initial_number - 32) * 5 / 9).toFixed(2);
					if(celsius[celsius.length - 1] === '0' && celsius[celsius.length - 2] === "0"){
						celsius = celsius.replace(".00","")
					}

					sendText = `${initial_number} °F is ${celsius} °C`;

				} else if (args[2].toUpperCase() === "K"){
					let kelvin = ((initial_number * 9 / 5) + 240.15).toFixed(2);
					if (kelvin[kelvin.length - 1] === '0' && kelvin[kelvin.length - 2] === "0") {
						kelvin = kelvin.replace(".00", "")
					}

					sendText = `${initial_number} °F is ${kelvin} K`;
				
				} else {
					sendText = "Can only convert to fahrenheit from celsius";
				}
				break;
			case "K":
				if (args[2].toUpperCase() === "C") {
					let celsius = (initial_number - 272.15).toFixed(2);
					if (celsius[celsius.length - 1] === '0' && celsius[celsius.length - 2] === "0") {
						celsius = celsius.replace(".00", "")
					}

					sendText = `${initial_number} K is ${celsius}°C`;

				} else if (args[2].toUpperCase() === "F") {
					let fahrenheit = ((initial_number - 273.15) * 9 / 5 + 32).toFixed(2);
					if (fahrenheit[fahrenheit.length - 1] === '0' && fahrenheit[fahrenheit.length - 2] === "0") {
						fahrenheit = fahrenheit.replace(".00", "")
					}

					sendText = `${initial_number} K is ${fahrenheit} °F`;
				}

				else {
					sendText = "Can only convert to fahrenheit or celsius from kelvin";
				}
				break;
			case "KG":
				if (args[2].toUpperCase() === "LB" || args[2].toUpperCase() === "LBS") {
					let LB = (initial_number * 2.20462262).toFixed(2);

					if(LB[LB.length - 1] === '0' && LB[LB.length - 2] === "0"){
						LB = LB.replace(".00","")
					}

					sendText = `${initial_number} kg is ${LB} lb`;
				} else {
					sendText = "Can only convert to lb from kg.";
				}
				break;
			case "LB":
			case "LBS":
				if (args[2].toUpperCase() === "KG") {
					let KG = (initial_number / 2.20462262).toFixed(2);

					if(KG[KG.length - 1] === '0' && KG[KG.length - 2] === "0"){
						KG = KG.replace(".00","")
					}

					sendText = `${initial_number} lb is ${KG} kg`;
				} else {
					sendText = "Can only convert to kg from lb.";
				}
				break;
			default:
				sendText = "No conversion method for that yet"
				break;
		}
		message.channel.send(sendText);

	}
};
