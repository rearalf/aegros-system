function stringToColor(string){
	let hash = 0
	let i

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash)
	}

	let color = '#'

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff
		color += `00${value.toString(16)}`.substr(-2)
	}
	/* eslint-enable no-bitwise */

	return color
}

export function stringAvatar(name){
	if (name === undefined) return
	const nameSplit = name.split(' ')
	if (nameSplit.length === 4 || nameSplit.length === 3)
		return {
			sx: {
				bgcolor: stringToColor(name),
			},
			children: `${nameSplit[0][0]}${nameSplit[2][0]}`,
		}
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${nameSplit[0][0]}${nameSplit[1][0]}`,
	}
}

export function validateEmails(email){
	const email_reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (email_reg.test(email)) {
		return true
	}
	else {
		return false
	}
}
