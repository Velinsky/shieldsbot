const OPCODE = "!random"

module.exports.EXACT = OPCODE;
module.exports.STARTS_WITH = "ShieldsBot,";
module.exports.help = "Ask shieldbot any yes/no equestion and he'll give you truthful and honest answer you should definitely follow"
module.exports.description = "Get an answer to a yes/no question"

module.exports.handler = async function(message, user, persistence, noOpcode) {
	let noYes = ['no', 'yes'];
	return noYes[Math.round(Math.random(0, 1))]
}
