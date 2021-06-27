module.exports = function(user){
	let date = user.createdAt;
	return date.getUTCFullYear().toString()+"-"+date.getUTCMonth()+"-"+date.getUTCDate()+" "+date.getUTCHours()+":"+date.getUTCMinutes()+":"+date.getUTCSeconds();
}