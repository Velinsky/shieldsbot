const moment = require("moment")
const wowDatasource = require("./wowDatasource")

const OPCODE = "!wow"

module.exports.STARTS_WITH = OPCODE;
module.exports.handler = async function(message, user, persistence) {
	let datasource = await wowDatasource(persistence)

	let timezone = message.replace(OPCODE, "").trim();

	if (timezone) {
		return Promise.resolve(datasource.nextWowTimezone(timezone));
	}

	return Promise.resolve(datasource.nextWowIn());
}
