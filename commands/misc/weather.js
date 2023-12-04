const getWeather = require('../../util/getWeather')

module.exports = {
	name: "weather",
	description: "Returns what the weather is for the specified location",
	async execute({message, args}) {
		if(args.length < 1){
			message.channel.send(`You have to provide a location`)
			return;
		}
		let location = args.join(" ")
		let weather = {};
		weather = await getWeather(location).catch((err) => {
			console.log(err);
			weather.weather = `An error occured while getting the weather for ${location}\nSee console for more info`;
			weather.success = false;
		});

		// convert °C to °F and add it after C temperature in parentheses
		let tempRegex = /(-?\d+)(?=°C)/g;
		if(weather.success){
			let tempInCelsius = weather.weather.match(tempRegex)[0];
			let tempInFahrenheit = `(${Math.round(tempInCelsius * 1.8 + 32)}°F)`;
			let splitWeather = weather.weather.split("°C");
			weather.weather = `${splitWeather[0]}°C ${tempInFahrenheit} ${splitWeather[1]}`
		}
		message.channel.send(weather.weather);
	}

}