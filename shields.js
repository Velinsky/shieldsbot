const fs = require('fs');
const path = require('path');
const moment = require('moment');
const R = require('ramda')

let file = JSON.parse(fs.readFileSync(path.join(__dirname, 'persistence.json')))

function createShield(name, duration, comment) {
	let [amount, unit] = duration.split(" ")

	return {
		name,
		comment,
		duration,
		start: +new Date,
		end: +moment().add(amount, unit)
	}
}

let shields = file || {}

module.exports = {
	addShield(name, duration, comment) {
		let shield = createShield(name, duration, comment);
		shields[name] = shield;

		fs.writeFileSync(path.join(__dirname, 'persistence.json'), JSON.stringify(shields))
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
