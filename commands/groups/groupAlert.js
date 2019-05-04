const flexWrapper = require('../_utils/messageHelpers').flexWrapper
const groupsDatasource = require('./groupsDatasource')

const OPCODE = '!alert '

module.exports.STARTS_WITH = OPCODE;
module.exports.help = ''
module.exports.description = ''
module.exports.handler = async function(message, user, persistence, client) {
	let datasource = await groupsDatasource(persistence);
	let noOpcode = message.replace(OPCODE, '');
	let group = datasource.listGroup(noOpcode)

	let promises = group.members.map(member => {
		return client.pushMessage(member.userId, {
			type: 'text',
			text: `You're being alerted as [${group.description}] by the user [${user.userName}]. Please respond immediately.`
		}).then(success => {
			return {
				error: false,
				target: member.userName,
			}
		}).catch((e) => {
			console.log('unable to send message to user ' + member.userName, e)
			return {
				error: true,
				target: member.userName,
				e: e
			}
		});
	})

	return Promise.all(promises).then((results) => {
			let finalMessage = [];
			let successUsers = results.filter(r => !r.error).map(r => r.target);
			let failedUsers = results.filter(r => r.error).map(r => r.target);

			if (successUsers.length > 0) {
				finalMessage.push("Alerted users: " + successUsers.join(", "));
			}

			if (failedUsers.length > 0) {
				if (successUsers.length > 0) {
					finalMessage.push("\n")
				}

				finalMessage.push("Failed to alert: " + failedUsers.join(", "));
				finalMessage.push("Message these manually and tell them to add ShieldsBot to their friend list.")
			}

			return finalMessage.join("\n")
		}
	)
}
