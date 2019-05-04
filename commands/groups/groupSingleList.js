const flexWrapper = require('../_utils/messageHelpers').flexWrapper
const groupsDatasource = require('./groupsDatasource')
const groupPage = require('./flexStyles').groupPage

const OPCODE = "!groups "

module.exports.STARTS_WITH = OPCODE;
module.exports.help = ""
module.exports.description = ""
module.exports.handler = async function(message, user, persistence) {
	let datasource = await groupsDatasource(persistence);
	let noOpcode = message.replace(OPCODE, "");

	let group = datasource.listGroup(noOpcode);

	return flexWrapper(`Listing group ${noOpcode}`, groupPage(group))
}
