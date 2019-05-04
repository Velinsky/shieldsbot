module.exports.groupPage = function(group, user) {
	let lines = group.members.map((member) => {
		return {
			type: 'text',
			text: member.userName,
			color: '#2f2f2f',
			flex: 0
		}
	})

	if (lines.length === 0) {
		lines.push({
			type: 'text',
			text: 'no one is here :(',
			color: '#e7e7e3',
			align: 'center',
			flex: 1
		})
	}

	return {
		type: 'bubble',
		styles: {
			header: {
				backgroundColor: '#bf292a'
			},
			body: {
				backgroundColor: '#ffffff'
			},
			footer: {
				backgroundColor: '#e6e6e6'
			}
		},
		header: {
			type: 'box',
			layout: 'baseline',
			margin: 'none',
			spacing: 'md',
			contents: [
				{
					flex: 3,
					color: '#ffe9f0',
					align: 'start',
					type: 'text',
					size: 'lg',
					text: group.description
				},
				{
					align: 'end',
					flex: 1,
					color: '#812222',
					type: 'text',
					size: 'sm',
					text: `[${group.id}]`
				}
			]
		},
		body: {
			type: 'box',
			layout: 'vertical',
			spacing: 'sm',
			contents: [
				{
					type: 'box',
					flex: 0,
					layout: 'horizontal',
					contents: [
						{
							margin: "sm",
							flex: 1,
							type: 'button',
							style: 'link',
							height: 'sm',
							action: {
								type: 'message',
								label: 'Join',
								text: '!group add ' + group.id
							}
						},
						{
							margin: "sm",
							flex: 1,
							type: 'button',
							style: 'link',
							height: 'sm',
							action: {
								type: 'message',
								label: 'Leave',
								text: '!group leave ' + group.id
							}
						}]
				},
				...lines
			]
		},
		footer: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'button',
					style: 'primary',
					action: {
						type: 'message',
						label: 'Notify all',
						text: '!alert ' + group.id
					}
				}
			]
		}
	}
}

module.exports.allGroups = function(groups) {
	let mappedGroups = groups.map(group => {
		return this.groupPage(group)
	})

	return mappedGroups;
}
