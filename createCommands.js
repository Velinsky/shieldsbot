const replyToCommand = require('./replyToCommand')

const shieldsCmd = require('./commands/shields')
const shieldsListCmd = require('./commands/shieldsList')
const randomCmd = require('./commands/random')

module.exports = function (persistence) {
	return replyToCommand.create(persistence, [
		{
			// matches: "",
			startsWith: shieldsCmd.OPCODE,
			handler: shieldsCmd.handler
		},
		{
			exact: shieldsListCmd.EXACT,
			handler: shieldsListCmd.handler
		},
		{
			exact: randomCmd.EXACT,
			handler: randomCmd.handler
		}
	])
}
