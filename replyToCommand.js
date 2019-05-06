const createHelp = (commands) => {
	let str = '';

	commands.forEach(cmd => {
		str += cmd.summonDocumentation + '\n'
		str += cmd.description + '\n\n'
	})

	return str;
}

const createHelpForCommand = (text, commands) => {
	let str = `Command ${text} not found`;

	commands.forEach(cmd => {
		let canBe = [
			cmd.startsWith,
			cmd.startsWith ? cmd.startsWith.substr(1) : undefined,
			cmd.exact,
			cmd.exact ? cmd.exact.substr(1) : undefined]


		if (canBe.includes(text)) {
			str = `${cmd.summonDocumentation}
			
			${cmd.help}`
		}
	})

	return str;
}

module.exports.create = (persistence, commands) => {
	return {
		textInput(cmd, user, lineApiClient) {
			let matchingCommand;
			let matchedWithStartsWith = false;

			if (cmd === '!help') {
				return Promise.resolve(createHelp(commands))
			}
			else if (cmd.startsWith('!help ')) {
				return Promise.resolve(createHelpForCommand(cmd.replace('!help ', ''), commands))
			}

			for (let i = 0; i < commands.length; i++) {
				let singleCommand = commands[i];
				if (singleCommand.startsWith && cmd.toLowerCase().startsWith(singleCommand.startsWith.toLowerCase())) {
					matchingCommand = singleCommand
					break;
				}
				else if (singleCommand.exact && singleCommand.exact.toLowerCase() === cmd.toLowerCase()) {
					matchingCommand = singleCommand;
					break;
				}
			}

			if (matchingCommand) {
				if (matchingCommand.needsUser && (!user.userName || !user.userId)) {
					return Promise.resolve(`Sorry, I can't respond to [${cmd}] since LINE API won't send me your ID. Try adding me to friends first.`)
				}
				return matchingCommand.handler(cmd, user, persistence, lineApiClient)
			}

			return Promise.resolve(false);
		}
	}
}
