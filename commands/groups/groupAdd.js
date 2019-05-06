const flexWrapper = require('../_utils/messageHelpers').flexWrapper
const groupsDatasource = require('./groupsDatasource')
const E_GROUP_NOT_FOUND = require('./utils/errors').E_GROUP_NOT_FOUND

const OPCODE = "!group add "

module.exports.STARTS_WITH = OPCODE;
module.exports.help = ""
module.exports.description = ""
module.exports.needsUser = true
/**
 *
 * @param message
 * @param {MessageUserProfile} user
 * @param persistence
 * @param noOpcode
 * @returns {Promise<{type, altText, contents}>}
 */
module.exports.handler = async function(message, user, persistence) {
	let datasource = await groupsDatasource(persistence);
	let noOpcode = message.replace(OPCODE, "");

	try {
		datasource.addToGroup(user, noOpcode)
	}
	catch (e) {
		if (e.code === E_GROUP_NOT_FOUND) {
			return `Group ${noOpcode} was not found`
		}
		else {
			throw e;
		}
	}


	return `${user.userName} was added to the group ${noOpcode}`
}
