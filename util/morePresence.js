module.exports = function (user) {
	let details;
	switch (user.user.presence.activities[0].name) {
		case "foobar2000":
			details = `Artist/Album: ${user.user.presence.activities[0].state}\nSong: ${user.user.presence.activities[0].details}\n`
			break;
		case "Apple Music":
			details = `Artist/Song: ${user.user.presence.activities[0].state}\nAlbum: ${user.user.presence.activities[0].details}\n`
			break;
		case "Spotify":
			details = `Artist: ${user.user.presence.activities[0].state}\nAlbum: ${user.user.presence.activities[0].details}\nSong: ${user.user.presence.activities[0].assets.largeText}`
			break;
		default:
			details = 0;
			break;
	}

	return details
}