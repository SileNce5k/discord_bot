module.exports = function(user){
	let date = user.createdAt;
	return date.getUTCFullYear() + '-' + ('0' + (date.getUTCMonth()+1)).slice(-2) + '-' + ('0' + date.getUTCDate()).slice(-2)+" "+date.getUTCHours()+":"+date.getUTCMinutes()+":"+date.getUTCSeconds();
}