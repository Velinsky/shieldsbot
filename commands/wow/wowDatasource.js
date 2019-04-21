const moment = require("moment")

const PERSISTENCE_KEY = "CMD_wow"

module.exports = async (persistence) => {
	let wowTimestamp = await persistence.getKey(PERSISTENCE_KEY) || {}

	return {
		setNextWow(timestamp) {
			persistence.setKey(PERSISTENCE_KEY, timestamp)
		},

		nextWowTimezone(timezone) {
			return moment(wowTimestamp).format("DD. HH:mm:ss")
		},

		nextWowIn() {
			if (!wowTimestamp || wowTimestamp < (+new Date())) {
				return "Next wow date wasn't set"
			}

			let duration = moment.duration(moment(wowTimestamp).diff())
			return `Next War of Wonders is in ${duration.days()} days ${duration.hours()} hours from now.`
		}
	}
}
