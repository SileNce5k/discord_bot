module.exports = function (user) {
	let details;
	switch (user.user.presence.activities[0].name) {
		case "foobar2000":
			details = `Artist/Album: ${user.user.presence.activities[0].state}\nSong: ${user.user.presence.activities[0].details}\n`
			break;
		case "Apple Music":
			details = `Artist/Song: ${user.user.presence.activities[0].details} \nAlbum: ${user.user.presence.activities[0].state}\n`
			break;
		case "Spotify":
			details = `Artist: ${user.user.presence.activities[0].state}\nAlbum: ${user.user.presence.activities[0].details}\nSong: ${user.user.presence.activities[0].assets.largeText}\n`
			break;
		case "Custom Status":
			details = `"${user.user.presence.activities[0].state}"\n`
			break;
		case "Code":
			if(user.user.presence.activities[0].details.slice(0, 7) === "Editing")
				details = `Workspace: ${user.user.presence.activities[0].state}\nEditing: ${user.user.presence.activities[0].details.slice(8)}\n`
			else 
				details = `Workspace: ${user.user.presence.activities[0].state}\n${user.user.presence.activities[0].details}\n`
			break;
		default:
			details = 0;
			break;
	}

	return details
}