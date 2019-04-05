const replyToCommand = require('./replyToCommand')
const memoryPersistence = require('./persistence/memoryPersistence')
const shieldsCmd = require('./commands/shields')
const shieldsListCmd = require('./commands/shieldsList')


let persistence = memoryPersistence.create()
let replier = replyToCommand.create(persistence, [
	{
		// matches: "",
		startsWith: shieldsCmd.OPCODE,
		handler: shieldsCmd.handler
	},
	{
		exact: shieldsListCmd.EXACT,
		handler: shieldsListCmd.handler
	}
])

const handle = (cmd) => replier.textInput(cmd, { userName: "Butter King"}).then(console.log, console.error)

// handle("shield 2 day")
handle("shields")
// handle("xx")

