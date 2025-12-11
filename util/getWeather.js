const https = require('https');

module.exports = async function (location, bot) {
	const options = {
		hostname: "wttr.in",
		port: 443,
		path: `/${location}?format=4&M`,
		method: 'GET',
		timeout: 5000
	}
	let success = false;
	let weather = await new Promise((resolve, reject) => {
		https.get(options, (res) => {
			let data = '';
			res.on('data', (chunk) => {
				data += chunk;
			});
			res.on('end', () => {
				if(res.statusCode === 404){
					resolve(`Couldn't find weather for ${location}`);
					return;
				}else if(res.statusCode != 200){
					resolve(`Something went wrong while getting the weather for ${location}`);
					bot.log(`Got status code: ${res.statusCode} when trying to get weather for ${location}`);
				} else{
					resolve(data);
					success = true;
				}
				
			});
		}).on("error", (err) => {
			reject(err);
		}).on('timeout', (err) => {
			resolve(`Timed out while getting weather for ${location}. Weather service might be down\nCheck console for more info`);
			bot.error(err);
			success = false;
		});
		
	})
	return {success: success, weather: weather};
	
}