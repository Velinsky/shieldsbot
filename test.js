const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})

const replyToCommand = require('./replyToCommand')
// const persistenceBase = require('./persistence/memoryPersistence')
const persistenceBase = require('./persistence/redisPersistence')
const shieldsCmd = require('./commands/shields')
const shieldsListCmd = require('./commands/shieldsList')


let persistence = persistenceBase.create()
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
const chat = () => readline.question(`-> `, (cmd) => {
	handle(cmd).then(chat)
})

chat()

