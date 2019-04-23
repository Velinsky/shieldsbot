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
		textInput(cmd, user) {
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
				return matchingCommand.handler(cmd, user, persistence)
			}

			return Promise.resolve(false);
		}
	}
}
