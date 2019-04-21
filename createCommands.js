const replyToCommand = require('./replyToCommand')

const shieldsCmd = require('./commands/shields')
const shieldsListCmd = require('./commands/shieldsList')
const randomCmd = require('./commands/random')
const wowRegisterCmd = require('./commands/wow/wowRegister')
const wowGetCmd = require('./commands/wow/wowGet')
const authorCmd = require('./commands/author')

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
		},
		{
			startsWith: randomCmd.STARTS_WITH,
			handler: randomCmd.handler
		},
		{
			startsWith: wowRegisterCmd.STARTS_WITH,
			handler: wowRegisterCmd.handler
		},
		{
			startsWith: wowGetCmd.STARTS_WITH,
			handler: wowGetCmd.handler
		},
		{
			startsWith: authorCmd.EXACT,
			handler: authorCmd.handler
		}
	])
}
