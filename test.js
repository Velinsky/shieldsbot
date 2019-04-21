const createCommands = require('./createCommands')

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})

// const persistenceBase = require('./persistence/memoryPersistence')
const persistenceBase = require('./persistence/redisPersistence')


let persistence = persistenceBase.create()
let replier = createCommands(persistence)
const handle = (cmd) => replier.textInput(cmd, { userName: "Butter King"}).then(console.log, console.error)

// handle("shield 2 day")
const chat = () => readline.question(`-> `, (cmd) => {
	handle(cmd).then(chat)
})

chat()

