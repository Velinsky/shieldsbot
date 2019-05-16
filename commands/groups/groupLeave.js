const flexWrapper = require('../_utils/messageHelpers').flexWrapper
const groupsDatasource = require('./groupsDatasource')

const OPCODE = "!group leave "

module.exports.STARTS_WITH = OPCODE;
module.exports.help = ""
module.exports.description = ""
module.exports.handler = async function(message, user, persistence) {
	let datasource = await groupsDatasource(persistence);
	let noOpcode = message.replace(OPCODE, "").trim();
	let userName = user.userName;
	let groupName = noOpcode;

	if (noOpcode.includes(" ")) {
		let [a, b] = noOpcode.split(/ (.+)/);
		groupName = a;
		userName = b;
	}

	datasource.removeFromGroupByName(userName, groupName);

	return `User ${user.userName} was removed from the group ${noOpcode}. Probably.`
}
