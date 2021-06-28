const convertDateToISOString = require("./convertDateToISOString");
module.exports = function(user){
	let date = user.user.createdAt;
	return convertDateToISOString(date);
}