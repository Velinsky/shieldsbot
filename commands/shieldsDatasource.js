const moment = require('moment');
const R = require('ramda')
const PERSISTENCE_KEY = "CMD_shields"

function createShield(name, unit, amount, comment) {
	return {
		name,
		comment,
		duration: amount + ' ' + unit,
		start: +new Date,
		end: +moment().add(amount, unit)
	}
}

module.exports = (persistence) => {
	let shields = persistence.getKey(PERSISTENCE_KEY) || {}

	return {
		addShield(name, unit, amount, comment) {
			let shield = createShield(name, unit, amount, comment);
			shields[name] = shield;

			persistence.setKey(PERSISTENCE_KEY, shields)
			return shield;
		},
		getActiveShields() {
			let now = moment();

			return R.pipe(
				R.toPairs,
				R.map(R.last),
				R.map((shield) => ({
					...shield,
					expiresIn: moment(shield.end).diff(now),
					expiresInHuman: moment.duration(moment(shield.end).diff(now)).humanize(),
					expiresInHours: moment.duration(moment(shield.end).diff(now)).as('hours'),
				})),
				R.filter((shield) => shield.expiresIn > 0)
			)(shields)
		}
	}
}
