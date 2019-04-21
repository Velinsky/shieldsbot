const moment = require("moment")
const wowDatasource = require("./wowDatasource")

const OPCODE = "!next wow in "

module.exports.STARTS_WITH = OPCODE;
module.exports.handler = async function(message, user, persistence) {
	let datasource = await wowDatasource(persistence)

	let noOpcode = message.replace(OPCODE, "").trim();

	let matches = noOpcode.match(/([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/i)
	if (!matches || matches.length === 0) {
		return Promise.resolve(`Unable to register next wow, incorrect format. Correct format is ${OPCODE} dd:hh:mm`);
	}

	datasource.setNextWow(+moment().add(matches[1], "days").add(matches[2], "hours").add(matches[3], "minutes"))

	return Promise.resolve(`Okay, set next wow to be in ${matches[1]} days, ${matches[2]} hours and ${matches[3]} minutes.`)
}
