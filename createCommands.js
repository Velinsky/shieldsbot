const replyToCommand = require('./replyToCommand')

const shieldsCmd = require('./commands/shields')
const shieldsListCmd = require('./commands/shieldsList')
const randomCmd = require('./commands/random')
const wowRegisterCmd = require('./commands/wow/wowRegister')
const wowGetCmd = require('./commands/wow/wowGet')
const authorCmd = require('./commands/author')
const flexTest = require('./commands/flexTest')
const groupAdd = require('./commands/groups/groupAdd')
const groupAlert = require('./commands/groups/groupAlert')
const groupList = require('./commands/groups/groupList')
const groupSingleList = require('./commands/groups/groupSingleList')
const groupRemove = require('./commands/groups/groupRemove')
const groupLeave = require('./commands/groups/groupLeave')

let cmds = [shieldsCmd, shieldsListCmd, randomCmd, wowRegisterCmd, wowGetCmd, authorCmd, flexTest,
	groupAdd, groupAlert, groupList, groupSingleList, groupRemove, groupLeave];

module.exports = function (persistence) {
	let mappedCommands = cmds.map(cmd => {
		let retObj = {};
		let summonDocumentation = "";

		if (cmd.STARTS_WITH) {
			retObj.startsWith = cmd.STARTS_WITH
			summonDocumentation = `${cmd.STARTS_WITH} (message starts with this string)`
		}
		else if (cmd.EXACT) {
			retObj.exact = cmd.EXACT
			summonDocumentation = `${cmd.EXACT} (send exact message)`
		}

		retObj.handler = cmd.handler;
		retObj.description = cmd.description;
		retObj.help = cmd.help;
		retObj.summonDocumentation = summonDocumentation;

		return retObj;
	})

	return replyToCommand.create(persistence, mappedCommands)
}
