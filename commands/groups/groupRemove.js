const flexWrapper = require('../_utils/messageHelpers').flexWrapper
const groupsDatasource = require('./groupsDatasource')

const OPCODE = "!group remove "

module.exports.STARTS_WITH = OPCODE;
module.exports.help = "!group remove groupName:userName"
module.exports.description = ""
module.exports.handler = async function(message, user, persistence) {
	let datasource = await groupsDatasource(persistence);
	let noOpcode = message.replace(OPCODE, "");
	let [groupName, userName] = noOpcode.split(":")

	datasource.removeFromGroupByName(userName, groupName);

	return flexWrapper("remove group", {
		"type": "bubble",
		"body": {
			"type": "box",
			"layout": "horizontal",
			"contents": [
				{
					"type": "text",
					"text": `User ${userName} removed from group ${groupName}. Probably`,
					"color": "#00ff00",
					"flex": 0
				},
			]
		}
	})
}
