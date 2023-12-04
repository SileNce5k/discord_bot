const https = require('https');

module.exports = async function (location) {
	const url = `https://wttr.in/${location}?format=4&M` // 4 = one line, M = metric wind speed
	let success = false;
	let weather = await new Promise((resolve, reject) => {
		https.get(url, (res) => {
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
				} else{
					resolve(data);
					success = true;
				}
				
			});
		}).on("error", (err) => {
			reject(err);
		});
	})
	return {success: success, weather: weather};
	
}