const flexWrapper = require('../_utils/messageHelpers').flexWrapper
const groupsDatasource = require('./groupsDatasource')

const OPCODE = "!groups "

module.exports.STARTS_WITH = OPCODE;
module.exports.help = ""
module.exports.description = ""
module.exports.handler = async function(message, user, persistence) {
	let datasource = await groupsDatasource(persistence);
	let noOpcode = message.replace(OPCODE, "");

	let group = datasource.listGroup(noOpcode);

	let lines = group.members.map((member) => {
		return {
			"type": "text",
			"text": member.userName + member.userId,
			"color": "#00ff00",
			"flex": 1
		}
	})

	return flexWrapper(`Listing group ${noOpcode}`, {
		type: "bubble",
		header: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					color: "#8b0000",
					align: "center",
					type: 'text',
					text: group.id
				},
				{
					color: "#8b0000",
					align: "center",
					type: 'text',
					size: "sm",
					text: group.description
				}
			]
		},
		"body": {
			"type": "box",
			"layout": "vertical",
			"contents": lines
		}
	})
}
