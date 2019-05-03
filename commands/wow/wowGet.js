const moment = require("moment")
const wowDatasource = require("./wowDatasource")

const OPCODE = "!wow"

module.exports.STARTS_WITH = OPCODE;
module.exports.help = `
Tell when next wow will take place.
Summon with no params to tell remaining time
Summon with a timezone name param to tell when in your timezone next wow will take place. Only supports GMT now and even about that I'm not really sure.`
module.exports.description = "Tell when next wow will take place. Experimental timezone support."
module.exports.handler = async function(message, user, persistence) {
	let datasource = await wowDatasource(persistence)

	let timezone = message.replace(OPCODE, "").trim();

	if (timezone) {
		let nextWow = datasource.nextWowTimezone(timezone);
		return Promise.resolve(nextWow);
	}

	return Promise.resolve(datasource.nextWowIn());
}
