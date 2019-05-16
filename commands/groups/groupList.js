const flexWrapper = require('../_utils/messageHelpers').flexWrapper
const groupsDatasource = require('./groupsDatasource')
const flexStyles = require('./flexStyles')

const OPCODE = "!groups"

module.exports.EXACT = OPCODE;
module.exports.help = ""
module.exports.description = ""
module.exports.handler = async function(message, user, persistence) {
	let datasource = await groupsDatasource(persistence);
	let noOpcode = message.replace(OPCODE, "");

	let groups = datasource.listGroups();

	return flexWrapper("all groups", flexStyles.allGroups(groups))
}
