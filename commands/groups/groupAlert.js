const flexWrapper = require('../_utils/messageHelpers').flexWrapper

const OPCODE = "!alert "

module.exports.STARTS_WITH = OPCODE;
module.exports.help = ""
module.exports.description = ""
module.exports.handler = async function(message, user, persistence, noOpcode) {
	return flexWrapper("alerting group", {
		type: "bubble",
		body: {
			type: "box",
			layout: "horizontal",
			contents: [
				{
					type: "text",
					text: "Under construction",
					color: "#000000",
					size: "xs",
					flex: 0
				}
			]
		}
	})
}
