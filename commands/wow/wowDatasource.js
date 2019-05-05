const moment = require("moment")
const tz = require("moment-timezone")

const DATE_FORMAT = "D. MMM HH:mm:ss Z"
const PERSISTENCE_KEY = "CMD_wow"

module.exports = async (persistence) => {
	let wowTimestamp = await persistence.getKey(PERSISTENCE_KEY) || 0
	let utcNextWow = moment.utc(wowTimestamp);

	return {
		setNextWow(timestamp) {
			persistence.setKey(PERSISTENCE_KEY, timestamp)
		},

		nextWowTimezone(timezones) {
			let utcNextWow = moment.utc(wowTimestamp);

			if (!Array.isArray(timezones)) {
				return utcNextWow.tz(timezones).format(DATE_FORMAT)
			}

			return timezones.map((tzName) => ({
				timezone: tzName,
				time: utcNextWow.tz(tzName),
				timeFormatted: utcNextWow.tz(tzName).format(DATE_FORMAT)
			}))
		},

		hasNextWow() {
			if (!wowTimestamp || wowTimestamp < (+new Date())) {
				return false
			}

			return true;
		},

		nextWowIn() {
			if (!wowTimestamp || wowTimestamp < (+new Date())) {
				return "Next wow date wasn't set"
			}

			let duration = moment.duration(moment(wowTimestamp).diff())
			let days = duration.days() > 0 ? (duration.days() + " days, ") : ""
			let hours = duration.hours() > 0 ? (duration.hours() + " hours") : ""
			let and = (days || hours) ? " and " : ""

			return `In ${days}${hours}${and}${duration.minutes()} minutes from now.`
		}
	}
}
