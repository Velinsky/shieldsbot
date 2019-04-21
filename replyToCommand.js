module.exports.create = (persistence, commands) => {
	return  {
		textInput(cmd, user) {
			let matchingCommand;
			let matchedWithStartsWith = false;

			for (let i = 0; i < commands.length; i++) {
				let singleCommand = commands[i];
				if (singleCommand.startsWith && cmd.toLowerCase().startsWith(singleCommand.startsWith)) {
					matchingCommand = singleCommand
					break;
				}
				else if (singleCommand.exact && singleCommand.exact === cmd) {
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
