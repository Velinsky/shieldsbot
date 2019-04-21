const wowDatasource = require("./wowDatasource")
const OPCODE = "!next wow in "


module.exports.STARTS_WITH = OPCODE;
module.exports.handler = async function(message, user, persistence, noOpcode) {
	let datasource = await wowDatasource(persistence)

	return Promise.resolve("OK REGISTERED")
}
