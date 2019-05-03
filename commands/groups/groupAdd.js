const flexWrapper = require('../_utils/messageHelpers').flexWrapper
const groupsDatasource = require('./groupsDatasource')

const OPCODE = "!group add "

module.exports.STARTS_WITH = OPCODE;
module.exports.help = ""
module.exports.description = ""
/**
 *
 * @param message
 * @param {MessageUserProfile} user
 * @param persistence
 * @param noOpcode
 * @returns {Promise<{type, altText, contents}>}
 */
module.exports.handler = async function(message, user, persistence) {
	let datasource = await groupsDatasource(persistence);
	let noOpcode = message.replace(OPCODE, "");

	datasource.addToGroup(user, noOpcode)

	return flexWrapper(`${user.userName} was added to group ${noOpcode}`, {
		"type": "bubble",
		"body": {
			"type": "box",
			"layout": "horizontal",
			"contents": [
				{
					"type": "text",
					"text": "Top prick",
					"color": "#00ff00",
					"flex": 0
				},
				{
					"type": "text",
					"text": "We all love gargantua a monkximus",
					"wrap": true,
					"color": "#ff0000",
					"flex": 2
				},
				{
					"type": "text",
					"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
					"wrap": true,
					"color": "#0000ff",
					"flex": 3
				}
			]
		}
	})
}
