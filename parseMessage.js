const OPCODE = "shield "

module.exports = function(msg) {
	if (!msg.toLowerCase().startsWith(OPCODE)) return false;

	let matches = msg.replace(new RegExp(OPCODE, "i"), "").match(/([0-9]+) ([a-z]+)(:.*)?/)

	if (!matches) {
		return {
			error: true,
			message: "Looks like you tried to summon shield bot but used incorrect format. Correct format is \"shield [amount] [duration]\", for example: shield 3 days"
		}
	}

	return {
		duration: matches[1],
		amount: matches[2],
		comment: matches[3] ? matches[3].replace(":", "").trim() : ""
	}
}
