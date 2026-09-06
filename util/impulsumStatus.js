const http = require('http');

module.exports = async function () {
	const options = {
		hostname: "game.playimpulsum.com",
		port: 80,
		path: `/accounts/status`,
		method: 'GET',
		timeout: 5000
	}
	let msg = await new Promise((resolve, reject) => {
        let msg = "";
		http.get(options, (res) => {
            if(res.statusCode !== 200) {
                msg = `Server responded with http error code '${res.statusCode}'`
                res.resume();
                resolve(msg);
            }
			let data = '';
			res.on('data', (chunk) => {
				data += chunk;
			});
			res.on('end', () => {
                try {
                    const p = JSON.parse(data);
                    msg = p;

                } catch(e) {
                    msg = "There was an error parsing the response from the server.";
                    console.error(e.message);
                }
                   resolve(msg)
            })
				
		}).on("error", (err) => {
            resolve("An error occured while getting the status from the impulsum server")
			console.error(err);
			
		}).on('timeout', (err) => {
            console.error(err);
			resolve(`Timed out while getting the status from impulsum. Server might be down\nCheck console for more info`);
			res.destroy();
		});
		
	});
    return msg;
}
