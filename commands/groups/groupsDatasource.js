const E_GROUP_NOT_FOUND = require('./utils/errors').E_GROUP_NOT_FOUND
const PERSISTENCE_KEY = 'CMD_GROUPS'

let initialGroups = [
	{
		id: 'r4',
		description: 'R4 guild members',
		members: []
	},
	{
		id: 'rl',
		description: 'Rally leaders',
		members: []
	},
	{
		id: 't4',
		description: 'T4 army players',
		members: []
	},
	{
		id: 'farm',
		description: 'Farms',
		members: []
	}
]

module.exports = async (persistence) => {
	let groups = await persistence.getKey(PERSISTENCE_KEY) || initialGroups

	return {
		addToGroup(player, groupName) {
			let foundGroup = groups.find(group => group.id === groupName);

			if (!foundGroup) {
				throw { code: E_GROUP_NOT_FOUND };
			}

			if (!foundGroup.members.find(member => member.userId === player.userId)) {
				foundGroup.members.push(player)
			}

			persistence.setKey(PERSISTENCE_KEY, groups)
		},

		removeFromGroupByName(userName, groupName) {
			let foundGroup = groups.find(group => group.id === groupName);

			if (!foundGroup) {
				throw { code: E_GROUP_NOT_FOUND };
			}

			let foundIndex;

			if ((foundIndex = foundGroup.members.findIndex(member => member.userName === userName)) !== -1) {
				foundGroup.members.splice(foundIndex, 1)
				persistence.setKey(PERSISTENCE_KEY, groups)
			}
		},

		listGroups() {
			return groups;
		},

		listGroup(groupName) {
			let foundGroup = groups.find(group => group.id === groupName);

			if (!foundGroup) {
				throw { code: E_GROUP_NOT_FOUND };
			}

			return foundGroup;
		}
	}
}
