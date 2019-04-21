const shieldsDatasource = require('./shieldsDatasource')
const OPCODE = "!shield "

const parseMessage = (msg) => {
	let matches = msg.replace(new RegExp(OPCODE, "i"), "").match(/([0-9]+) ([a-z]+)(:.*)?/)

	if (!matches) {
		return {
			error: true,
			message: "Looks like you tried to summon shield bot but used incorrect format. Correct format is \"shield [amount] [duration]\", for example: shield 3 days"
		}
	}

	return {
		unit: matches[2],
		amount: matches[1],
		comment: matches[3] ? matches[3].replace(":", "").trim() : ""
	}
}

module.exports.OPCODE = OPCODE;
module.exports.handler = async function(message, user, persistence, noOpcode) {
	let shields = await shieldsDatasource(persistence);
	let parsed = parseMessage(message)

	// parsing error
	if (parsed.error) {
		return Promise.resolve(parsed.message)
	}
	// all good here
	else {
		shields.addShield(user.userName, parsed.unit, parsed.amount, parsed.comment)
		return Promise.resolve(`Registered new shield for user [${user.userName}], ends in [${parsed.amount}] [${parsed.unit}].`)
	}
}
