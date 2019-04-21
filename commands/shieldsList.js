const shieldsDatasouce = require('./shieldsDatasource')
const EXACT = '!shields'


module.exports.EXACT = EXACT;
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
