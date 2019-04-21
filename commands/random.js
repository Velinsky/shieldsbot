const OPCODE = ".random"

module.exports.EXACT = OPCODE;
module.exports.handler = async function(message, user, persistence, noOpcode) {
	let noYes = ['no', 'yes'];
	return noYes[Math.round(Math.random(0, 1))]
}
