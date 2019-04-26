const shieldsDatasource = require('./shieldsDatasource')
const STARTS_WITH = "!shield "

const parseMessage = (msg) => {
	let matches = msg.replace(new RegExp(STARTS_WITH, "i"), "").match(/([0-9]+) ([a-z]+)(:.*)?/)

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

module.exports.STARTS_WITH = STARTS_WITH;
module.exports.help = `
Add a new shield to the available shields in the guild people can hide troops at. 
Example:
!shield add 2 days
!shield add 36 minutes:Spartan likes big fat cocks

You can use any unit you want (week, month, day, hour, minute) in plural / singular form. Add a message of your liking after the : as a note to your shields entry`
module.exports.description = "Add shield to the list of guild shields to hide troops at."

module.exports.needsUser = true;
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
