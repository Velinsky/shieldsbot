const moment = require('moment')
const wowDatasource = require('./wowDatasource')
const flexWrapper = require('../_utils/messageHelpers').flexWrapper

const OPCODE = '!wow'

module.exports.STARTS_WITH = OPCODE;
module.exports.help = `
Tell when next wow will take place.
Summon with no params to tell remaining time
Summon with a timezone name param to tell when in your timezone next wow will take place. Only supports GMT now and even about that I'm not really sure.`
module.exports.description = 'Tell when next wow will take place. Experimental timezone support.'
module.exports.handler = async function(message, user, persistence) {
	let datasource = await wowDatasource(persistence)

	let timezone = message.replace(OPCODE, '').trim();

	if (timezone) {
		let nextWow = datasource.nextWowTimezone(timezone);
		return Promise.resolve(nextWow);
	}

	let tzMap = {
		'America/Los_Angeles': 'West Coast',
		'America/New_York': 'East Coast',
		'Europe/London': 'London',
		'Europe/Prague': 'CEST',
		'Europe/Athens': 'Our greek gods',
		'Asia/Shanghai': 'China',
		'Asia/Ho_Chi_Minh': 'Vietnam'
	};

	let datesInZones = datasource.nextWowTimezone(Object.keys(tzMap));
	console.log(datasource.nextWowIn())

	let lines = datesInZones.map(zoneData => {
		return {
			type: 'box',
			layout: 'horizontal',
			spacing: 'md',
			contents: [
				{
					type: 'text',
					size: "xs",
					weight: "bold",
					text: tzMap[zoneData.timezone]
				},
				{
					type: 'separator'
				},
				{
					type: 'text',
					size: "xs",
					text: zoneData.timeFormatted
				}
			]
		}
	})


	return Promise.resolve(flexWrapper({
		'type': 'bubble',
		'header': {
			'type': 'box',
			'layout': 'vertical',
			'contents': [
				{
					'type': 'text',
					'text': 'Next War of Wonders'
				}
			]
		},
		'body': {
			'type': 'box',
			'layout': 'vertical',
			'spacing': 'md',
			'contents': lines
		},
		'footer': {

			'type': 'box',
			'layout': 'vertical',
			'contents': [
				{
					'type': 'text',
					'text': datasource.nextWowIn()
				}
			]
		}
	}));
}
