module.exports = function (user) {
	let details;
	switch (user.presence.activities[0].name) {
		case "foobar2000":
			let artist = user.presence.activities[0].state.split(":")[0];
			let album = user.presence.activities[0].state.split(":")[1].slice(1);

			details = `Artist: ${artist}\nAlbum: ${album}\nSong: ${user.presence.activities[0].details}\n`
			break;
		case "Apple Music":
			details = `Artist/Song: ${user.presence.activities[0].details} \nAlbum: ${user.presence.activities[0].state}\n`
			break;
		case "Spotify":
			details = `Artist: ${user.presence.activities[0].state}\nAlbum: ${user.presence.activities[0].details}\nSong: ${user.presence.activities[0].assets.largeText}\n`
			break;
		case "Custom Status":
			if(user.presence.activities[0].state !== null)
				details = `"${user.presence.activities[0].state}"\n`
			else
				details = "";
			break;
		case "Code":
			if(user.presence.activities[0].details != null)
			if(user.presence.activities[0].details.slice(0, 7) === "Editing")
				details = `Workspace: ${user.presence.activities[0].state}\nEditing: ${user.presence.activities[0].details.slice(8)}\n`
			else 
				details = `Workspace: ${user.presence.activities[0].state}\n${user.presence.activities[0].details}\n`
			break;
		default:
			details = 0;
			break;
	}

	return details
}