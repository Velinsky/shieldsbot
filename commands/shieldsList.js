const shieldsDatasouce = require('./shieldsDatasource')
const EXACT = '!shields'


module.exports.EXACT = EXACT;
module.exports.help = "Lists all the available shields. The time is automatically calculated based on the time of the entry, so for example 3 day shield added yesterday will show only two days left now"
module.exports.description = "List all the available shields to hide troops at"
module.exports.handler = async function(message, user, persistence, noOpcode) {
	let shields = await shieldsDatasouce(persistence);
	let msg = '';

	if (shields.getActiveShields().length === 0) {
		return Promise.resolve("There are no active shields.")
	}
	shields.getActiveShields().forEach((shield) => {
		msg += `You can hide at ${shield.name}'s turf, his shield expires in ${shield.expiresInHuman}`

		if (shield.comment) {
			msg += ` (${shield.comment})`
		}

		msg += '\n'
	})

	return Promise.resolve(msg)
}
